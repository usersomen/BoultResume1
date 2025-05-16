import { ResumeData } from '../../types/resume';

interface ModernProfileTemplateProps {
  resume: ResumeData;
}

export const ModernProfileTemplate = ({ resume }: ModernProfileTemplateProps) => {
  return (
    <div className="max-w-[850px] mx-auto bg-white p-8 shadow-lg print:shadow-none print:p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 print:mb-6">
        {/* Name and Title */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-3xl">{resume.personalInfo.firstName} {resume.personalInfo.lastName}</h1>
          <h2 className="text-xl text-blue-500 font-normal mb-4 print:text-lg print:mb-3">{resume.personalInfo.title}</h2>
          
          {/* Contact Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 print:text-sm">
            <a href={`mailto:${resume.personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-500 transition-colors print:hover:text-current">
              <span className="w-4 h-4 print:w-3 print:h-3">📧</span>
              {resume.personalInfo.email}
            </a>
            <a href={`tel:${resume.personalInfo.phone}`} className="flex items-center gap-2 hover:text-blue-500 transition-colors print:hover:text-current">
              <span className="w-4 h-4 print:w-3 print:h-3">📞</span>
              {resume.personalInfo.phone}
            </a>
            <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500 transition-colors print:hover:text-current">
              <span className="w-4 h-4 print:w-3 print:h-3">🌐</span>
              {resume.personalInfo.website}
            </a>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 print:w-3 print:h-3">📍</span>
              {resume.personalInfo.location}
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 print:w-24 print:h-24 print:border-2">
          <img 
            src={resume.personalInfo.photo} 
            alt={`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-8 print:mb-6">
        <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">SUMMARY</h3>
        <p className="text-gray-600 leading-relaxed print:text-sm">{resume.personalInfo.summary}</p>
      </div>

      {/* Experience Section */}
      <div className="mb-8 print:mb-6">
        <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">EXPERIENCE</h3>
        {resume.experience.map((exp, index) => (
          <div key={exp.id} className={`${index !== 0 ? 'mt-6 print:mt-4' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <div>
                <h4 className="text-gray-900 font-semibold print:text-sm">{exp.position}</h4>
                <h5 className="text-blue-500 print:text-sm">{exp.company}</h5>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm print:text-xs mt-1 sm:mt-0">
                <span>{exp.location}</span>
                <span>•</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-2 print:space-y-1 print:text-sm">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="leading-relaxed">{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="mb-8 print:mb-6">
        <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">SKILLS</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 print:gap-3 print:grid-cols-3">
          {resume.skills.map((skill, index) => (
            <div key={index} className="bg-gray-50 rounded-lg px-4 py-2 text-gray-700 print:bg-transparent print:border print:border-gray-200 print:text-sm">
              {skill.name}
              {skill.level && (
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${skill.level * 10}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-8 print:mb-6">
        <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">EDUCATION</h3>
        {resume.education.map((edu, index) => (
          <div key={edu.id} className={`${index !== 0 ? 'mt-6 print:mt-4' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <div>
                <h4 className="text-gray-900 font-semibold print:text-sm">{edu.degree} in {edu.field}</h4>
                <h5 className="text-blue-500 print:text-sm">{edu.school}</h5>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm print:text-xs mt-1 sm:mt-0">
                <span>{edu.graduationDate}</span>
                {edu.gpa && (
                  <>
                    <span>•</span>
                    <span>GPA: {edu.gpa}</span>
                  </>
                )}
              </div>
            </div>
            {edu.achievements && edu.achievements.length > 0 && (
              <ul className="list-disc list-inside text-gray-600 space-y-1 print:text-sm">
                {edu.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Projects Section */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-8 print:mb-6">
          <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">PROJECTS</h3>
          {resume.projects.map((project, index) => (
            <div key={project.id} className={`${index !== 0 ? 'mt-6 print:mt-4' : ''}`}>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-gray-900 font-semibold print:text-sm">{project.name}</h4>
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600 text-sm print:text-xs"
                  >
                    View Project →
                  </a>
                )}
              </div>
              <p className="text-gray-600 mb-2 print:text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded print:bg-transparent print:border print:border-blue-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages Section */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="mb-8 print:mb-6">
          <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">LANGUAGES</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 print:gap-3">
            {resume.languages.map((language, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 print:bg-transparent print:border print:border-gray-200">
                <span className="text-gray-700 print:text-sm">{language.name}</span>
                <span className="text-gray-500 text-sm print:text-xs">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      <div>
        <h3 className="text-gray-700 font-semibold text-lg border-b-2 border-gray-200 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">CERTIFICATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
          {resume.certificates.map((cert) => (
            <div key={cert.id} className="bg-gray-50 rounded-lg p-4 print:bg-transparent print:border print:border-gray-200 print:p-3">
              <h4 className="text-gray-900 font-semibold mb-1 print:text-sm">{cert.name}</h4>
              <div className="text-gray-600 text-sm print:text-xs">
                {cert.issuer} • {cert.date}
              </div>
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600 text-sm mt-1 inline-block print:hidden"
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 