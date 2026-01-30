import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { BotIcon, SendIcon, XIcon } from './Icons';
import { GenerateContentResponse } from '@google/genai';
import { USER_PROFILE } from '../constants';

// Helper component to format the AI response
const FormattedMessage = ({ text }: { text: string }) => {
  const parseBold = (str: string) => {
    return str.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-indigo-300">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const lines = text.split('\n');
  
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />; // Spacer

        // Headers (###)
        if (trimmed.startsWith('###')) {
          return (
            <h3 key={i} className="font-bold text-indigo-200 mt-3 mb-1 text-base border-b border-indigo-500/30 pb-1">
              {parseBold(trimmed.replace(/^###\s*/, ''))}
            </h3>
          );
        }

        // Bullet points (- or *)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex gap-2 ml-1">
              <span className="text-indigo-500 font-bold">•</span>
              <span className="flex-1">{parseBold(trimmed.replace(/^[\-\*]\s+/, ''))}</span>
            </div>
          );
        }

        // Regular paragraphs
        return <p key={i}>{parseBold(line)}</p>;
      })}
    </div>
  );
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: `Hi! I'm the assistant for **${USER_PROFILE.name}**. \n\nI can help you with:\n- **QA & Testing Skills**\n- **Projects & Code**\n- **Experience**\n\nWhat would you like to know?` 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Add a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      const streamResult = await sendMessageToGemini(userText);
      let fullResponse = "";

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || "";
        fullResponse += textChunk;
        
        // Update the last message (the model's placeholder) with accumulating text
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => {
         // Remove the empty placeholder if error happened immediately
         const newMessages = prev.filter(m => m.text !== ''); 
         return [...newMessages, { role: 'model', text: "I'm having trouble connecting right now. Please try again later.", isError: true }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!process.env.API_KEY) {
     return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-80 md:w-96 mb-4 flex flex-col h-[550px] overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <BotIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Portfolio Assistant</span>
                <span className="text-xs text-indigo-100 opacity-90">Ask me anything about Chad</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : msg.isError 
                        ? 'bg-red-900/20 text-red-400 border border-red-900/50'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  ) : (
                    <FormattedMessage text={msg.text} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ex: What are your testing skills?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-110 transition-all duration-300 relative"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <BotIcon className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};

export default AIChat;