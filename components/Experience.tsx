import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From intensive training to practical application, here is how I've grown as a developer and tester.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 items-center`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-indigo-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 mt-1.5 md:mt-0 z-20 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className={`bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-300 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex flex-col gap-2 mb-4">
                       <span className="text-indigo-400 font-mono text-sm font-bold tracking-wider">{exp.period}</span>
                       <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                       <div className="text-slate-300 font-medium">
                         {exp.companyUrl ? (
                           <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1">
                             {exp.company}
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                           </a>
                         ) : (
                           exp.company
                         )}
                       </div>
                    </div>
                    
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;