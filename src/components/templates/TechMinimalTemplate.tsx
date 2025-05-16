import React from 'react';
import { ResumeData } from '../../types/resume';
import { 
  Code2, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Award,
  Briefcase,
  Cpu
} from 'lucide-react';

export const TechMinimalTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  return (
    <div className="min-h-[297mm] bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {resume.personalInfo.photo && (
              <img 
                src={resume.personalInfo.photo} 
                alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
                className="w-24 h-24 rounded-lg border-2 border-slate-600 shadow-xl"
              />
            )}
            <div>
              <h1 className="text-3xl font-mono font-bold tracking-tight">{`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}</h1>
              <h2 className="text-xl text-slate-300 mt-1 font-mono">{resume.personalInfo.title}</h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            {resume.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-sm justify-end">
          {resume.personalInfo.linkedin && (
            <a href={`https://${resume.personalInfo.linkedin}`} className="flex items-center gap-1 hover:text-slate-300">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {resume.personalInfo.github && (
            <a href={`https://${resume.personalInfo.github}`} className="flex items-center gap-1 hover:text-slate-300">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {resume.personalInfo.website && (
            <a href={`https://${resume.personalInfo.website}`} className="flex items-center gap-1 hover:text-slate-300">
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </header>

      <main className="p-8 grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          <section className="font-mono">
            <p className="text-slate-600 leading-relaxed">{resume.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-mono">
              <Briefcase className="w-5 h-5" />
              Experience
            </h3>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4">
                  <div className="absolute w-2 h-2 bg-slate-800 left-0 top-2" />
                  <h4 className="font-bold text-slate-800 font-mono">{exp.position}</h4>
                  <div className="text-slate-600 font-mono">{exp.company}</div>
                  <div className="text-sm text-slate-500">
                    {exp.startDate} - {exp.endDate} • {exp.location}
                  </div>
                  <p className="mt-2 text-slate-600">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-slate-600 text-sm">
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
          {resume.projects && (
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-mono">
                <Code2 className="w-5 h-5" />
                Projects
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {resume.projects.map((project) => (
                  <div key={project.id} className="bg-white p-4 rounded border border-slate-200">
                    <h4 className="font-bold text-slate-800 font-mono">{project.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono"
                        >
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

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-mono">
              <Cpu className="w-5 h-5" />
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-sm font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-mono">
              <GraduationCap className="w-5 h-5" />
              Education
            </h3>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-slate-800 font-mono">{edu.school}</h4>
                  <div className="text-slate-600">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-sm text-slate-500">
                    {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {resume.certificates && (
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 font-mono">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.certificates.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-bold text-slate-700 font-mono">{cert.name}</h4>
                    <div className="text-sm text-slate-600">
                      {cert.issuer} • {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};