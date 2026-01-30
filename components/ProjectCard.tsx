import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, CodeIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-sm text-xs font-bold text-indigo-300 rounded-full shadow-sm border border-slate-700">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-6 line-clamp-3 text-sm flex-1">
          {project.description}
        </p>
        
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span key={tech} className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded font-medium border border-indigo-500/20">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 pt-4 border-t border-slate-800 mt-auto">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a 
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <CodeIcon className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;