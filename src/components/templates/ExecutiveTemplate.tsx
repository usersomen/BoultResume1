import React from 'react';
import { Book, Briefcase, GraduationCap, Mail, MapPin, Phone, Globe, Star } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { ResumeProjects } from '../ResumeProjects';
import { ResumeAwards } from '../ResumeAwards';
import { ResumeLanguages } from '../ResumeLanguages';
import { ResumeCertifications } from '../ResumeCertifications';

interface Props {
  resume: ResumeData;
}

export const ExecutiveTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="max-w-4xl mx-auto bg-[#FEF9F9] shadow-xl">
      {/* Modern Side Header */}
      <div className="grid grid-cols-12">
        <div className="col-span-4 bg-gradient-to-br from-[#ee9ca7] to-[#ffdde1] text-gray-800 p-8 min-h-screen">
          {resume.personalInfo.photo && (
            <div className="mb-8">
              <div className="w-40 h-40 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden">
                <img
                  src={resume.personalInfo.photo}
                  alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
              </h1>
              <h2 className="text-xl opacity-90">{resume.personalInfo.title}</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} />
                <span>{resume.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} />
                <span>{resume.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                <span>{resume.personalInfo.location}</span>
              </div>
              {resume.personalInfo.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={16} />
                  <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </div>
              )}
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star size={18} />
                Skills
              </h3>
              <div className="space-y-2">
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm">{skill.name}</span>
                    {skill.level && (
                      <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/60 rounded-full"
                          style={{ width: `${skill.level * 10}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-8 p-8">
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Book className="text-[#ee9ca7]" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Professional Summary</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{resume.personalInfo.summary}</p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="text-[#ee9ca7]" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
            </div>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-[#ee9ca7]">
                  <div className="absolute w-3 h-3 bg-[#ee9ca7] rounded-full -left-[7px] top-2" />
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-800">{exp.position}</h4>
                    <p className="text-[#ee9ca7]">{exp.company}</p>
                    <div className="text-sm text-gray-600">
                      <p>{exp.startDate} - {exp.endDate} | {exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="mb-1">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-[#ee9ca7]" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Education</h3>
            </div>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800">{edu.degree} in {edu.field}</h4>
                  <p className="text-[#ee9ca7]">{edu.school}</p>
                  <div className="text-sm text-gray-600">
                    <p>{edu.graduationDate}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            {resume.projects && (
              <div className="bg-white/50 p-6 rounded-lg">
                <ResumeProjects projects={resume.projects} />
              </div>
            )}
            {resume.certificates && (
              <div className="bg-white/50 p-6 rounded-lg">
                <ResumeAwards certificates={resume.certificates} />
              </div>
            )}
            {resume.languages && (
              <div className="bg-white/50 p-6 rounded-lg">
                <ResumeLanguages languages={resume.languages} />
              </div>
            )}
            {resume.certificates && (
              <div className="bg-white/50 p-6 rounded-lg">
                <ResumeCertifications certifications={resume.certificates} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};