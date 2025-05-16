import React from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  projects: ResumeData['projects'];
  className?: string;
}

export const ResumeProjects: React.FC<Props> = ({ projects, className = '' }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className={className}>
      {projects.map((project) => (
        <div key={project.id} className="mb-4">
          <h4 className="font-medium text-gray-900">{project.name}</h4>
          <p className="text-gray-700 text-sm">{project.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-1 block"
            >
              View Project
            </a>
          )}
        </div>
      ))}
    </div>
  );
}; 