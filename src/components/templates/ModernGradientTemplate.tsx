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
  Trophy,
  Heart
} from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export function ModernGradientTemplate({ resume }: TemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 relative">
        <div className="flex items-center gap-8">
          {resume.personalInfo.photo && (
            <img 
              src={resume.personalInfo.photo}
              alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <h2 className="text-2xl mt-2 text-purple-100">{resume.personalInfo.title}</h2>
            
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{resume.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{resume.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{resume.personalInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-2 text-sm">
              {resume.personalInfo.linkedin && (
                <a href={`https://${resume.personalInfo.linkedin}`} className="flex items-center gap-1 hover:text-purple-200">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {resume.personalInfo.github && (
                <a href={`https://${resume.personalInfo.github}`} className="flex items-center gap-1 hover:text-purple-200">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {resume.personalInfo.website && (
                <a href={`https://${resume.personalInfo.website}`} className="flex items-center gap-1 hover:text-purple-200">
                  <Globe className="w-4 h- 4" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 grid grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <section>
            <h3 className="text-xl font-bold text-purple-600 mb-2">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Experience
            </h3>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-purple-200">
                  <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-2" />
                  <h4 className="font-bold text-gray-800">{exp.position}</h4>
                  <div className="text-purple-600 font-medium">{exp.company}</div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate} • {exp.location}
                  </div>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700 text-sm">
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
            <h3 className="text-xl font-bold text-purple-600 mb-4">Notable Projects</h3>
            <div className="grid grid-cols-2 gap-4">
              {resume.projects.map((project) => (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-800">{project.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
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
        <div className="space-y-6">
          {/* Education */}
          <section>
            <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h3>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-800">{edu.school}</h4>
                  <div className="text-purple-600">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-xl font-bold text-purple-600 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {resume.certificates && (
            <section>
              <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.certificates.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-bold text-gray-800">{cert.name}</h4>
                    <div className="text-sm text-gray-600">
                      {cert.issuer} • {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          <section>
            <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Languages
            </h3>
            <div className="space-y-2">
              {resume.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-800">{lang.name}</span>
                  <span className="text-purple-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}