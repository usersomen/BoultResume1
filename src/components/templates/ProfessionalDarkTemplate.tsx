import React from 'react';
import { Resume } from '../../types/resume';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Award,
  Languages,
  BookOpen,
  Trophy
} from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export function ProfessionalDarkTemplate({ resume }: TemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8">
        <div className="flex items-center gap-8">
          {resume.personalInfo.photo && (
            <img 
              src={resume.personalInfo.photo}
              alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
              className="w-32 h-32 rounded-lg border-2 border-blue-400 shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <h2 className="text-2xl text-blue-300 mt-2">{resume.personalInfo.title}</h2>
            
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{resume.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{resume.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{resume.personalInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4 text-sm">
              {resume.personalInfo.linkedin && (
                <a href={`https://${resume.personalInfo.linkedin}`} className="flex items-center gap-2 text-blue-300 hover:text-blue-200">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {resume.personalInfo.github && (
                <a href={`https://${resume.personalInfo.github}`} className="flex items-center gap-2 text-blue-300 hover:text-blue-200">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {resume.personalInfo.website && (
                <a href={`https://${resume.personalInfo.website}`} className="flex items-center gap-2 text-blue-300 hover:text-blue-200">
                  <Globe className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          <section>
            <p className="text-gray-300 leading-relaxed">{resume.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2 border-b border-gray-700 pb-2">
              <Briefcase className="w-5 h-5" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l border-blue-800">
                  <div className="absolute w-2 h-2 bg-blue-400 rounded-full -left-1 top-2" />
                  <h4 className="font-bold text-gray-100">{exp.position}</h4>
                  <div className="text-blue-400">{exp.company}</div>
                  <div className="text-sm text-gray-400">
                    {exp.startDate} - {exp.endDate} • {exp.location}
                  </div>
                  <p className="mt-2 text-gray-300">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-300 text-sm">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2 border-b border-gray-700 pb-2">
              Notable Projects
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {resume.projects.map((project) => (
                <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-100">{project.name}</h4>
                  <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-blue-300 rounded text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h3>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-100">{edu.school}</h4>
                  <div className="text-blue-400">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-sm text-gray-400">
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {resume.certificates && (
            <section>
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.certificates.map((cert) => (
                  <div key={cert.id} className="bg-gray-800 p-3 rounded">
                    <h4 className="font-bold text-gray-100">{cert.name}</h4>
                    <div className="text-sm text-gray-400">
                      {cert.issuer} • {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              <Languages className="w-5 h-5" />
              Languages
            </h3>
            <div className="space-y-2">
              {resume.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-100">{lang.name}</span>
                  <span className="text-blue-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}