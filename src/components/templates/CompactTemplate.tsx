import React from 'react';
import { ResumeData } from '../../types/resume';
import { Award, Briefcase, GraduationCap, Mail, MapPin, Phone, User, Globe, Github, Linkedin } from 'lucide-react';

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

interface Skill {
  name: string;
  level?: number;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export const CompactTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, experience, education, skills, projects, languages, certificates } = resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-t-lg">
        <div className="flex items-center gap-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-full border-2 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h1>
            <h2 className="text-lg mb-3">{personalInfo.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe size={14} />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Portfolio
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github size={14} />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin size={14} />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <User className="text-gray-700" size={16} />
            <h3 className="text-lg font-semibold text-gray-700">Professional Summary</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="text-gray-700" size={16} />
                <h3 className="text-lg font-semibold text-gray-700">Work Experience</h3>
              </div>
              <div className="space-y-4">
                {experience.map((exp: Experience) => (
                  <div key={exp.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{exp.position}</h4>
                        <p className="text-gray-600 text-sm">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>{`${exp.startDate} - ${exp.endDate}`}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {exp.achievements.map((achievement: string, idx: number) => (
                        <li key={idx} className="mb-1">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {projects && projects.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-gray-700" size={16} />
                  <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
                </div>
                <div className="space-y-3">
                  {projects.map((project: Project) => (
                    <div key={project.id} className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium text-gray-800">{project.name}</h4>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="text-gray-700" size={16} />
                <h3 className="text-lg font-semibold text-gray-700">Education</h3>
              </div>
              <div className="space-y-3">
                {education.map((edu: Education) => (
                  <div key={edu.id} className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                    <div className="text-xs text-gray-500">
                      <p>{edu.graduationDate}</p>
                      <p>{edu.field}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {skills && skills.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-gray-700" size={16} />
                  <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: Skill, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-50 rounded text-gray-600 text-xs">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="text-gray-700" size={16} />
                  <h3 className="text-lg font-semibold text-gray-700">Languages</h3>
                </div>
                <div className="space-y-1">
                  {languages.map((lang: Language, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{lang.name}</span>
                      <span className="text-gray-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certificates && certificates.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-gray-700" size={16} />
                  <h3 className="text-lg font-semibold text-gray-700">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {certificates.map((cert: Certificate) => (
                    <div key={cert.id} className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium text-gray-800">{cert.name}</h4>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};