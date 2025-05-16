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
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export function ElegantSerifTemplate({ resume }: TemplateProps) {
  return (
    <div className="min-h-[297mm] bg-amber-50 font-serif">
      {/* Header */}
      <header className="bg-gradient-to-b from-amber-800 to-amber-900 text-amber-50 p-12 relative">
        <div className="max-w-4xl mx-auto flex items-center gap-8">
          {resume.personalInfo.photo && (
            <img 
              src={resume.personalInfo.photo}
              alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
              className="w-36 h-36 rounded-full border-4 border-amber-200 shadow-xl"
            />
          )}
          <div>
            <h1 className="text-5xl font-light tracking-wide">
              {resume.personalInfo.firstName} {resume.personalInfo.lastName}
            </h1>
            <h2 className="text-2xl text-amber-200 mt-2 font-light">{resume.personalInfo.title}</h2>
            
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-200" />
                <span>{resume.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-200" />
                <span>{resume.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-200" />
                <span>{resume.personalInfo.location}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4 text-sm">
              {resume.personalInfo.linkedin && (
                <a href={`https://${resume.personalInfo.linkedin}`} className="flex items-center gap-2 text-amber-200 hover:text-amber-100">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {resume.personalInfo.github && (
                <a href={`https://${resume.personalInfo.github}`} className="flex items-center gap-2 text-amber-200 hover:text-amber-100">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {resume.personalInfo.website && (
                <a href={`https://${resume.personalInfo.website}`} className="flex items-center gap-2 text-amber-200 hover:text-amber-100">
                  <Globe className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-12 space-y-12">
        {/* Summary */}
        <section className="text-center">
          <p className="text-lg text-amber-900 leading-relaxed italic">{resume.personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-2xl font-light text-amber-900 mb-8 flex items-center gap-3 justify-center">
            <Briefcase className="w-6 h-6" />
            Professional Experience
          </h3>
          <div className="space-y-8">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-amber-200">
                <div className="absolute w-4 h-4 bg-amber-800 rounded-full -left-[9px] top-2" />
                <h4 className="text-xl font-semibold text-amber-900">{exp.position}</h4>
                <div className="text-lg text-amber-800">{exp.company}</div>
                <div className="text-amber-700">
                  {exp.startDate} - {exp.endDate} • {exp.location}
                </div>
                <p className="mt-3 text-amber-900">{exp.description}</p>
                {exp.achievements && (
                  <ul className="mt-3 space-y-2">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-amber-800 flex items-start gap-2">
                        <Star className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Education */}
            <section>
              <h3 className="text-2xl font-light text-amber-900 mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" />
                Education
              </h3>
              <div className="space-y-6">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-amber-200 pl-6">
                    <h4 className="text-lg font-semibold text-amber-900">{edu.school}</h4>
                    <div className="text-amber-800">
                      {edu.degree} in {edu.field}
                    </div>
                    <div className="text-amber-700">
                      {edu.graduationDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-2xl font-light text-amber-900 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Certifications */}
            {resume.certificates && (
              <section>
                <h3 className="text-2xl font-light text-amber-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  Certifications
                </h3>
                <div className="space-y-4">
                  {resume.certificates.map((cert) => (
                    <div key={cert.id} className="border-l-2 border-amber-200 pl-6">
                      <h4 className="text-lg font-semibold text-amber-900">{cert.name}</h4>
                      <div className="text-amber-800">
                        {cert.issuer} • {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            <section>
              <h3 className="text-2xl font-light text-amber-900 mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6" />
                Languages
              </h3>
              <div className="space-y-2">
                {resume.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-amber-900">{lang.name}</span>
                    <span className="text-amber-700">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}