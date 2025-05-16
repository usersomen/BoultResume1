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

export const StartupTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, experience, education, skills, projects, languages, certificates } = resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      <header className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-t-lg">
        <div className="flex items-center gap-8">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h1>
            <h2 className="text-xl mb-4">{personalInfo.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe size={16} />
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Portfolio
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github size={16} />
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin size={16} />
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-teal-600" />
            <h3 className="text-xl font-semibold text-teal-600">Professional Summary</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="text-teal-600" />
                <h3 className="text-xl font-semibold text-teal-600">Work Experience</h3>
              </div>
              <div className="space-y-6">
                {experience.map((exp: Experience) => (
                  <div key={exp.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{exp.position}</h4>
                        <p className="text-teal-600">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{`${exp.startDate} - ${exp.endDate}`}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {exp.achievements.map((achievement: string, idx: number) => (
                        <li key={idx} className="mb-1">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {projects && projects.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-teal-600" />
                  <h3 className="text-xl font-semibold text-teal-600">Projects</h3>
                </div>
                <div className="space-y-4">
                  {projects.map((project: Project) => (
                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-gray-700">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-600 rounded text-sm">
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
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="text-teal-600" />
                <h3 className="text-xl font-semibold text-teal-600">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu: Education) => (
                  <div key={edu.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <p className="text-teal-600">{edu.school}</p>
                    <div className="text-sm text-gray-600">
                      <p>{edu.graduationDate}</p>
                      <p>{edu.field}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {skills && skills.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-teal-600" />
                  <h3 className="text-xl font-semibold text-teal-600">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: Skill, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-gray-50 rounded-full text-teal-600">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="text-teal-600" />
                  <h3 className="text-xl font-semibold text-teal-600">Languages</h3>
                </div>
                <div className="space-y-2">
                  {languages.map((lang: Language, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-teal-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certificates && certificates.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-teal-600" />
                  <h3 className="text-xl font-semibold text-teal-600">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {certificates.map((cert: Certificate) => (
                    <div key={cert.id} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-teal-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-600">{cert.date}</p>
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