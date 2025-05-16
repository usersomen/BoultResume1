import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Calendar, Briefcase, MapPin, AlertCircle } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface WorkExperienceStepProps {
  resumeData: ResumeData;
  onUpdate: (experience: ResumeData['experience']) => void;
}

// Initial empty experience entry
const emptyExperience = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: ['']
};

const WorkExperienceStep: React.FC<WorkExperienceStepProps> = ({
  resumeData,
  onUpdate
}) => {
  const [experiences, setExperiences] = useState<ResumeData['experience']>(
    resumeData.experience && resumeData.experience.length > 0
      ? resumeData.experience
      : [{ ...emptyExperience }]
  );

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    
    // If setting current to true, clear end date
    if (field === 'current' && value === true) {
      updatedExperiences[index].endDate = '';
    }
    
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const addExperience = () => {
    const updatedExperiences = [...experiences, { ...emptyExperience }];
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const removeExperience = (index: number) => {
    if (experiences.length === 1) {
      // If it's the last item, reset it instead of removing
      setExperiences([{ ...emptyExperience }]);
      onUpdate([{ ...emptyExperience }]);
      return;
    }
    
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === experiences.length - 1)
    ) {
      return;
    }

    const updatedExperiences = [...experiences];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [updatedExperiences[index], updatedExperiences[targetIndex]] = 
    [updatedExperiences[targetIndex], updatedExperiences[index]];
    
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const addHighlight = (expIndex: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].highlights = [
      ...updatedExperiences[expIndex].highlights || [],
      ''
    ];
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const updateHighlight = (expIndex: number, highlightIndex: number, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].highlights = [
      ...(updatedExperiences[expIndex].highlights || [])
    ];
    updatedExperiences[expIndex].highlights![highlightIndex] = value;
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].highlights = updatedExperiences[expIndex].highlights!.filter(
      (_, i) => i !== highlightIndex
    );
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          List your work experience in reverse chronological order (most recent first). Focus on achievements rather than duties, and quantify your impact where possible.
        </p>
      </div>
      
      {experiences.map((experience, expIndex) => (
        <div 
          key={expIndex}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">
              {experience.position || experience.company 
                ? `${experience.position}${experience.company ? ` at ${experience.company}` : ''}`
                : `Experience ${expIndex + 1}`}
            </h4>
            <div className="flex space-x-1">
              <button
                onClick={() => moveExperience(expIndex, 'up')}
                disabled={expIndex === 0}
                className={`p-1 rounded-md ${
                  expIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveExperience(expIndex, 'down')}
                disabled={expIndex === experiences.length - 1}
                className={`p-1 rounded-md ${
                  expIndex === experiences.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeExperience(expIndex)}
                className="p-1 rounded-md text-red-500 hover:bg-red-50"
                title="Remove experience"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                  placeholder="Company ABC"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                placeholder="Software Engineer"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm ${
                      experience.current ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => updateExperience(expIndex, 'current', e.target.checked)}
                  className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                />
                <span className="ml-2 text-sm text-gray-700">I currently work here</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
              rows={3}
              placeholder="Brief overview of your role and responsibilities..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm resize-none"
            ></textarea>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements
              </label>
              <button
                onClick={() => addHighlight(expIndex)}
                className="text-xs flex items-center text-[#4ECCA3] hover:text-[#45B08C]"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add achievement
              </button>
            </div>
            
            {experience.highlights && experience.highlights.length > 0 ? (
              <div className="space-y-3">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateHighlight(expIndex, highlightIndex, e.target.value)}
                        placeholder="Achieved a specific result using your skills (quantify if possible)"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeHighlight(expIndex, highlightIndex)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 border border-dashed border-gray-300 rounded-md">
                <button
                  onClick={() => addHighlight(expIndex)}
                  className="text-sm text-gray-500 hover:text-[#4ECCA3]"
                >
                  + Add your key achievements
                </button>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Use action verbs and quantify results (e.g., "Increased sales by 20%")
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          onClick={addExperience}
          className="px-4 py-2 border border-[#4ECCA3] text-[#4ECCA3] rounded-md hover:bg-[#4ECCA3]/10 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Experience
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 text-sm mb-2">Tips for Effective Work Experience</h4>
        <ul className="text-sm text-gray-600 pl-5 list-disc space-y-2">
          <li><strong>Use action verbs</strong> - Start bullet points with words like "developed," "managed," "created"</li>
          <li><strong>Quantify achievements</strong> - Use numbers to show impact (%, $, time saved)</li>
          <li><strong>Focus on results</strong> - Highlight outcomes rather than just responsibilities</li>
          <li><strong>Be concise</strong> - Use brief, impactful statements rather than long paragraphs</li>
          <li><strong>Tailor to the job</strong> - Emphasize experiences relevant to your target position</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkExperienceStep;
