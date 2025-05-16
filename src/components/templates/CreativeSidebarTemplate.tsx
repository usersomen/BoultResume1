import React from 'react';
import { Resume } from '../../types/resume';
import { 
  Palette, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Award,
  Briefcase,
  Heart,
  Lightbulb
} from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export function CreativeSidebarTemplate({ resume }: TemplateProps) {
  return (
    <div className="min-h-[297mm] flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-rose-600 text-white p-8">
        {/* Photo and Basic Info */}
        <div className="flex flex-col items-center mb-8">
          {resume.personalInfo.photo && (
            <img 
              src={resume.personalInfo.photo}
              alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
              className="w-40 h-40 rounded-full border-4 border-rose-300 shadow-lg mb-4"
            />
          )}
          <h1 className="text-2xl font-bold text-center">
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </h1>
          <h2 className="text-lg text-rose-200 mt-1">{resume.personalInfo.title}</h2>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>{resume.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>{resume.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{resume.personalInfo.location}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2 mb-8">
          {resume.personalInfo.linkedin && (
            <a href={`https://${resume.personalInfo.linkedin}`} className="flex items-center gap-2 text-sm hover:text-rose-200">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {resume.personalInfo.github && (
            <a href={`https://${resume.personalInfo.github}`} className="flex items-center gap-2 text-sm hover:text-rose-200">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {resume.personalInfo.website && (
            <a href={`https://${resume.personalInfo.website}`} className="flex items-center gap-2 text-sm hover:text-rose-200">
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-rose-700 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h3>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-bold">{edu.school}</h4>
                <div className="text-rose-200">
                  {edu.degree} in {edu.field}
                </div>
                <div className="text-sm text-rose-300">
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Languages
          </h3>
          <div className="space-y-2">
            {resume.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{lang.name}</span>
                <span className="text-rose-200">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="w-2/3 bg-white p-8">
        {/* Summary */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-rose-600 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            About Me
          </h3>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-rose-600 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h3>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-rose-200">
                <div className="absolute w-3 h-3 bg-rose-600 rounded-full -left-[7px] top-2" />
                <h4 className="font-bold text-gray-800">{exp.position}</h4>
                <div className="text-rose-600">{exp.company}</div>
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
        <section className="mb-8">
          <h3 className="text-xl font-bold text-rose-600 mb-4">Projects</h3>
          <div className="grid grid-cols-2 gap-4">
            {resume.projects.map((project) => (
              <div key={project.id} className="bg-rose-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800">{project.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {resume.certificates && (
          <section>
            <h3 className="text-xl font-bold text-rose-600 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {resume.certificates.map((cert) => (
                <div key={cert.id} className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">{cert.name}</h4>
                  <div className="text-sm text-gray-600">
                    {cert.issuer} • {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}