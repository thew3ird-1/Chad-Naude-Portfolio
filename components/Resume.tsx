import React from 'react';
import { USER_PROFILE, EXPERIENCES, PROJECTS, SOCIAL_LINKS } from '../constants';
import { XIcon, PrinterIcon } from './Icons';

interface ResumeProps {
  onClose: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onClose }) => {
  // Logic to separate Work Experience from Education based on "Student" keyword in role
  const education = EXPERIENCES.filter(exp => exp.role.toLowerCase().includes('student'));
  const workExperience = EXPERIENCES.filter(exp => !exp.role.toLowerCase().includes('student'));

  const handlePrint = () => {
    window.print();
  };

  const getSocialUrl = (platform: string) => SOCIAL_LINKS.find(link => link.platform === platform)?.url;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm overflow-y-auto print:bg-white print:overflow-visible print:static print:h-auto print:block">
      {/* Floating Actions for Screen View */}
      <div className="fixed top-4 right-4 flex gap-4 print:hidden z-50">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all font-medium"
        >
          <PrinterIcon className="w-5 h-5" />
          Print / Save PDF
        </button>
        <button 
          onClick={onClose}
          className="p-2 bg-slate-800 text-slate-300 rounded-full shadow-lg hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Printable Paper */}
      <div className="min-h-screen py-10 px-4 print:p-0 flex justify-center items-start print:block print:min-h-0">
        <div className="bg-white text-slate-900 w-full max-w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] shadow-2xl print:shadow-none print:w-full print:max-w-none rounded-sm print:m-0">
          
          {/* Header */}
          <header className="border-b-2 border-slate-800 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 break-inside-avoid">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 uppercase">{USER_PROFILE.name}</h1>
              <h2 className="text-lg font-medium text-indigo-700 mt-1">{USER_PROFILE.title}</h2>
              <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                <span>{USER_PROFILE.location}</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-600 flex flex-col gap-1 text-right items-start md:items-end">
              {USER_PROFILE.email && <a href={`mailto:${USER_PROFILE.email}`} className="hover:text-indigo-600 hover:underline">{USER_PROFILE.email}</a>}
              {USER_PROFILE.phoneNumber && <a href={`tel:${USER_PROFILE.phoneNumber}`} className="hover:text-indigo-600 hover:underline">{USER_PROFILE.phoneNumber}</a>}
              <a href={getSocialUrl('LinkedIn')} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline">LinkedIn Profile</a>
              <a href={getSocialUrl('GitHub')} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline">GitHub Profile</a>
              {/* Fallback for portfolio URL if not explicit */}
              <span className="text-slate-400 text-xs mt-1">Portfolio: {window.location.origin}</span>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-6 break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-slate-700 text-justify">
              {USER_PROFILE.bio}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-6 break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">Technical Skills</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
               {USER_PROFILE.skills.map((skill, idx) => (
                 <span key={idx} className="font-medium">• {skill}</span>
               ))}
            </div>
          </section>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-1 break-after-avoid">Work Experience</h3>
              <div className="space-y-4">
                {workExperience.map(exp => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <div className="text-sm font-semibold text-indigo-700 mb-1">{exp.company}</div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-2">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                         <span key={i} className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200 print:border-0 print:bg-transparent print:p-0 print:text-slate-500 print:italic">
                           {skill}{i < exp.skills.length - 1 ? ',' : ''}
                         </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-1 break-after-avoid">Education & Training</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                       <h4 className="text-base font-bold text-slate-900">{edu.company}</h4>
                       <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{edu.period}</span>
                    </div>
                    <div className="text-sm font-semibold text-indigo-700 mb-1">{edu.role}</div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          <section className="mb-6 print:mb-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-1 break-after-avoid">Key Projects</h3>
            <div className="space-y-4">
              {PROJECTS.map(proj => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base font-bold text-slate-900">{proj.title} <span className="text-xs font-normal text-slate-500 ml-2">({proj.category})</span></h4>
                    {proj.liveUrl && <span className="text-xs text-indigo-600 print:hidden">Live Demo Available</span>}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-1">
                    {proj.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold">Tech:</span> {proj.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Resume;