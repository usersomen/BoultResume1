import React from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  languages: ResumeData['languages'];
  className?: string;
}

export const ResumeLanguages: React.FC<Props> = ({ languages, className = '' }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className={className}>
      {languages.map((language, idx) => (
        <div key={idx} className="flex justify-between items-center mb-2">
          <span className="text-gray-700">{language.name}</span>
          <span className="text-gray-600 text-sm">{language.proficiency}</span>
        </div>
      ))}
    </div>
  );
}; 