import React, { useState } from 'react';
import { Lightbulb, Sparkles, AlertCircle } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface ProfessionalSummaryStepProps {
  resumeData: ResumeData;
  onUpdate: (summary: string) => void;
}

// Example summary templates based on experience level
const SUMMARY_TEMPLATES = {
  entry: [
    "Recent [degree] graduate with [relevant coursework/projects/internships] experience seeking to leverage skills in [skill] and knowledge of [knowledge area] to contribute to [target role/industry].",
    "Motivated [degree/certification] graduate with strong [skills] demonstrated through [projects/activities]. Eager to apply [specific knowledge] to drive results as a [target position].",
    "Detail-oriented [profession] with academic experience in [relevant fields]. Looking to apply skills in [skill areas] to solve [industry] challenges as a [target role]."
  ],
  mid: [
    "Results-driven [profession] with [X] years of experience in [industry/field]. Proven track record of [key achievement] resulting in [specific impact]. Adept at [key skill] and [another key skill].",
    "[Profession] with [X] years specializing in [specific area]. Successfully [key achievement] that [specific result]. Skilled in [relevant technologies/methodologies].",
    "Dedicated [profession] with [X] years' experience delivering [specific outcomes] for [types of companies/industries]. Recognized for [achievement/skill] and expertise in [area of expertise]."
  ],
  senior: [
    "Seasoned [profession] with [X]+ years spearheading [initiatives/projects] in the [industry] sector. Instrumental in [major achievement] that [specific measurable result]. Expertise in [key skill] and [another key skill].",
    "Strategic [profession/title] with extensive experience driving [specific business outcomes] across [industries/company types]. Led [major project/initiative] resulting in [quantifiable results]. Recognized authority on [specialist area].",
    "Accomplished [profession] and leader with comprehensive experience transforming [area] for [company types]. Consistently delivered [specific outcomes], including [specific achievement with metrics]. Expert in [methodologies/technologies]."
  ]
};

const ProfessionalSummaryStep: React.FC<ProfessionalSummaryStepProps> = ({
  resumeData,
  onUpdate
}) => {
  const [summary, setSummary] = useState(resumeData.summary || '');
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'mid' | 'senior'>('mid');
  const [showTemplates, setShowTemplates] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    onUpdate(newSummary);
  };
  
  const applyTemplate = (template: string) => {
    setSummary(template);
    onUpdate(template);
    setShowTemplates(false);
  };
  
  const characterCount = summary.length;
  const idealMinLength = 50;
  const idealMaxLength = 200;
  
  const getCountColor = () => {
    if (characterCount < idealMinLength) return 'text-yellow-600';
    if (characterCount > idealMaxLength) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <div className="flex">
          <Lightbulb className="h-5 w-5 text-[#4ECCA3] mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            Your professional summary is the first thing employers read. Make it compelling, concise, and tailored to your target role. Aim for 2-4 impactful sentences (50-200 characters).
          </p>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <span className={`text-xs font-medium ${getCountColor()}`}>
            {characterCount} characters
          </span>
        </div>
        
        <textarea
          value={summary}
          onChange={handleChange}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] text-sm resize-none"
          placeholder="Write a compelling summary that highlights your expertise, skills, and career goals..."
        />
        
        {characterCount < idealMinLength && (
          <p className="mt-1 text-xs text-yellow-600 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Consider adding more details to make your summary more impactful
          </p>
        )}
        {characterCount > idealMaxLength && (
          <p className="mt-1 text-xs text-red-600 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Consider shortening your summary for better readability
          </p>
        )}
      </div>
      
      <div>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center text-sm text-[#4ECCA3] hover:text-[#45B08C]"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          {showTemplates ? 'Hide summary templates' : 'Need inspiration? Use a template'}
        </button>
        
        {showTemplates && (
          <div className="mt-3 space-y-3">
            <div className="flex space-x-3 mb-4">
              {['entry', 'mid', 'senior'].map((level) => (
                <button
                  key={level}
                  onClick={() => setExperienceLevel(level as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                    experienceLevel === level
                      ? 'bg-[#4ECCA3] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'entry' ? 'Entry Level' : level === 'mid' ? 'Mid Level' : 'Senior Level'}
                </button>
              ))}
            </div>
            
            <div className="space-y-3">
              {SUMMARY_TEMPLATES[experienceLevel].map((template, index) => (
                <div 
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-[#4ECCA3] cursor-pointer transition-colors"
                  onClick={() => applyTemplate(template)}
                >
                  <p className="text-sm text-gray-700">{template}</p>
                  <div className="mt-2 flex justify-end">
                    <button 
                      className="text-xs text-[#4ECCA3] hover:text-[#45B08C] font-medium"
                    >
                      Use this template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 text-sm mb-2">Tips for a Strong Professional Summary</h4>
        <ul className="text-sm text-gray-600 pl-5 list-disc space-y-2">
          <li><strong>Be specific</strong> - Include your years of experience, specializations, and industry</li>
          <li><strong>Highlight achievements</strong> - Mention key accomplishments with measurable results</li>
          <li><strong>Showcase valuable skills</strong> - Emphasize skills relevant to your target position</li>
          <li><strong>Tailor to job descriptions</strong> - Customize your summary for each application by including keywords from the job posting</li>
          <li><strong>Avoid first-person pronouns</strong> - Skip "I" and "my" for a more professional tone</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalSummaryStep;
