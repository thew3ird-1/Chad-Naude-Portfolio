import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Resume from './components/Resume';

const App: React.FC = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <div className={`min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 ${showResume ? 'hidden print:hidden' : 'print:hidden'}`}>
        <Navbar onOpenResume={() => setShowResume(true)} />
        <main className="flex-grow">
          <Hero />
          <Experience />
          <Projects />
        </main>
        <Footer />
        <AIChat />
      </div>

      {/* Resume Modal / View */}
      {showResume && (
        <Resume onClose={() => setShowResume(false)} />
      )}
    </>
  );
};

export default App;