import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, Book, Briefcase, Languages, Rocket, Heart, Palette } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export function CreativeOrangeTemplate({ resume }: TemplateProps) {
  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex items-start gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">
              {resume.personalInfo.firstName}<br />{resume.personalInfo.lastName}
            </h1>
            <p className="text-2xl text-orange-100 mb-6">{resume.personalInfo.title}</p>
            
            <div className="grid grid-cols-2 gap-4 text-orange-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {resume.personalInfo.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {resume.personalInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {resume.personalInfo.location}
              </div>
              {resume.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  {resume.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>
          
          {resume.personalInfo.photo && (
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src={resume.personalInfo.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
            </div>
            
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-orange-500 before:to-red-500">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <div className="text-orange-600 font-medium">{exp.company}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {exp.startDate} - {exp.endDate} | {exp.location}
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-600 text-sm">• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white text-orange-600 rounded-full text-xs font-medium"
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

        <div className="col-span-4 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Book className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Education</h2>
            </div>
            
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                  <div className="text-orange-600">{edu.degree} in {edu.field}</div>
                  <div className="text-sm text-gray-600">
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Palette className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Skills</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Languages className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Languages</h2>
            </div>
            
            <div className="space-y-2">
              {resume.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{lang.name}</span>
                  <span className="text-sm text-orange-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>

          {resume.certificates && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
              </div>
              
              <div className="space-y-2">
                {resume.certificates.map((cert, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800">{cert.name}</h4>
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
    </div>
  );
}