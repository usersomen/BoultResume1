import React from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  certifications: ResumeData['certificates'];
  className?: string;
}

export const ResumeCertifications: React.FC<Props> = ({ certifications, className = '' }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">{cert.name}</h4>
            <p className="text-gray-600">{cert.issuer}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm">{cert.date}</span>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Certificate →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 