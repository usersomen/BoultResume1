import React from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  certificates: ResumeData['certificates'];
  className?: string;
}

export const ResumeAwards: React.FC<Props> = ({ certificates, className = '' }) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className={className}>
      {certificates.map((cert) => (
        <div key={cert.id} className="mb-4">
          <h4 className="font-medium text-gray-900">{cert.name}</h4>
          <p className="text-gray-600 text-sm">{cert.issuer}</p>
          <p className="text-gray-500 text-sm">{cert.date}</p>
          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-1 block"
            >
              View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
}; 