import React from 'react';
import { USER_PROFILE, SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon, GitlabIcon, PhoneIcon } from './Icons';

const Hero: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github': return <GithubIcon className="w-6 h-6" />;
      case 'gitlab': return <GitlabIcon className="w-6 h-6" />;
      case 'linkedin': return <LinkedinIcon className="w-6 h-6" />;
      case 'mail': return <MailIcon className="w-6 h-6" />;
      case 'phone': return <PhoneIcon className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <section id="home" className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden min-h-[90vh] flex items-center">
      {/* Dark background with gradient glow */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-950">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center w-full">
        
        {/* Left Column: Text Info */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 space-y-6 text-center md:text-left z-10">
          <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">
            {USER_PROFILE.title}
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">{USER_PROFILE.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            {USER_PROFILE.bio}
          </p>
          
          {/* Motivational Quote Block */}
          {USER_PROFILE.motivationalQuote && (
            <div className="bg-slate-900/40 border-l-4 border-indigo-500 p-4 max-w-lg mx-auto md:mx-0 rounded-r-xl backdrop-blur-sm">
              <p className="italic text-slate-300 font-serif text-lg leading-relaxed">"{USER_PROFILE.motivationalQuote}"</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
             {SOCIAL_LINKS.map((link) => (
               <a 
                 key={link.platform}
                 href={link.url}
                 target={link.icon === 'mail' || link.icon === 'phone' ? undefined : "_blank"}
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-slate-300 hover:border-indigo-500 hover:text-white hover:bg-slate-800 transition-all shadow-lg shadow-black/20"
               >
                 {getIcon(link.icon)}
                 <span className="font-medium">{link.platform}</span>
               </a>
             ))}
          </div>

          <div className="pt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {USER_PROFILE.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded-md text-sm font-medium hover:border-purple-500/50 hover:text-purple-200 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: User Photo */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
           {/* Adjusted container to be more square-ish to accommodate the hoodie text width */}
           <div className="relative w-[300px] h-[350px] md:w-[450px] md:h-[500px] group">
              {/* Glow effects behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[2rem] opacity-30 blur-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700"></div>
              
              {/* The Photo */}
              <img 
                src={USER_PROFILE.avatarUrl} 
                alt={USER_PROFILE.name} 
                className="relative w-full h-full object-cover rounded-[2rem] border-2 border-white/10 shadow-2xl z-10 transform transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ objectPosition: 'center top' }}
              />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;