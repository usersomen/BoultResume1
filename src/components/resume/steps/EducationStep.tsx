import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface EducationStepProps {
  resumeData: ResumeData;
  onUpdate: (education: ResumeData['education']) => void;
}

// Initial empty education entry
const emptyEducation = {
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  gpa: '',
  courses: [],
  achievements: []
};

const EducationStep: React.FC<EducationStepProps> = ({
  resumeData,
  onUpdate
}) => {
  const [educationItems, setEducationItems] = useState<ResumeData['education']>(
    resumeData.education && resumeData.education.length > 0
      ? resumeData.education
      : [{ ...emptyEducation }]
  );

  const updateEducation = (index: number, field: string, value: any) => {
    const updatedEducation = [...educationItems];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    // If setting current to true, clear end date
    if (field === 'current' && value === true) {
      updatedEducation[index].endDate = '';
    }
    
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const addEducation = () => {
    const updatedEducation = [...educationItems, { ...emptyEducation }];
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const removeEducation = (index: number) => {
    if (educationItems.length === 1) {
      // If it's the last item, reset it instead of removing
      setEducationItems([{ ...emptyEducation }]);
      onUpdate([{ ...emptyEducation }]);
      return;
    }
    
    const updatedEducation = educationItems.filter((_, i) => i !== index);
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === educationItems.length - 1)
    ) {
      return;
    }

    const updatedEducation = [...educationItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [updatedEducation[index], updatedEducation[targetIndex]] = 
    [updatedEducation[targetIndex], updatedEducation[index]];
    
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const addCourse = (eduIndex: number) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].courses = [
      ...updatedEducation[eduIndex].courses || [],
      ''
    ];
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const updateCourse = (eduIndex: number, courseIndex: number, value: string) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].courses = [
      ...(updatedEducation[eduIndex].courses || [])
    ];
    updatedEducation[eduIndex].courses![courseIndex] = value;
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const removeCourse = (eduIndex: number, courseIndex: number) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].courses = updatedEducation[eduIndex].courses!.filter(
      (_, i) => i !== courseIndex
    );
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const addAchievement = (eduIndex: number) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].achievements = [
      ...updatedEducation[eduIndex].achievements || [],
      ''
    ];
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const updateAchievement = (eduIndex: number, achievementIndex: number, value: string) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].achievements = [
      ...(updatedEducation[eduIndex].achievements || [])
    ];
    updatedEducation[eduIndex].achievements![achievementIndex] = value;
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  const removeAchievement = (eduIndex: number, achievementIndex: number) => {
    const updatedEducation = [...educationItems];
    updatedEducation[eduIndex].achievements = updatedEducation[eduIndex].achievements!.filter(
      (_, i) => i !== achievementIndex
    );
    setEducationItems(updatedEducation);
    onUpdate(updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          List your education in reverse chronological order (most recent first). Include degrees, certifications, and relevant coursework.
        </p>
      </div>
      
      {educationItems.map((education, eduIndex) => (
        <div 
          key={eduIndex}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">
              {education.institution || education.degree 
                ? `${education.degree || 'Degree'}${education.institution ? ` at ${education.institution}` : ''}`
                : `Education ${eduIndex + 1}`}
            </h4>
            <div className="flex space-x-1">
              <button
                onClick={() => moveEducation(eduIndex, 'up')}
                disabled={eduIndex === 0}
                className={`p-1 rounded-md ${
                  eduIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveEducation(eduIndex, 'down')}
                disabled={eduIndex === educationItems.length - 1}
                className={`p-1 rounded-md ${
                  eduIndex === educationItems.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeEducation(eduIndex)}
                className="p-1 rounded-md text-red-500 hover:bg-red-50"
                title="Remove education"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => updateEducation(eduIndex, 'institution', e.target.value)}
                  placeholder="University Name"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(eduIndex, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(eduIndex, 'field', e.target.value)}
                placeholder="Computer Science"
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
                  value={education.location}
                  onChange={(e) => updateEducation(eduIndex, 'location', e.target.value)}
                  placeholder="City, State"
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
                    value={education.startDate}
                    onChange={(e) => updateEducation(eduIndex, 'startDate', e.target.value)}
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
                    value={education.endDate}
                    onChange={(e) => updateEducation(eduIndex, 'endDate', e.target.value)}
                    disabled={education.current}
                    className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm ${
                      education.current ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={education.current}
                  onChange={(e) => updateEducation(eduIndex, 'current', e.target.checked)}
                  className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                />
                <span className="ml-2 text-sm text-gray-700">Currently studying here</span>
              </label>
              
              <div className="flex items-center">
                <label className="text-sm text-gray-700 mr-3">GPA:</label>
                <input
                  type="text"
                  value={education.gpa}
                  onChange={(e) => updateEducation(eduIndex, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Relevant Courses
              </label>
              <button
                onClick={() => addCourse(eduIndex)}
                className="text-xs flex items-center text-[#4ECCA3] hover:text-[#45B08C]"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add course
              </button>
            </div>
            
            {education.courses && education.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {education.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => updateCourse(eduIndex, courseIndex, e.target.value)}
                        placeholder="Advanced Database Systems"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeCourse(eduIndex, courseIndex)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-3 border border-dashed border-gray-300 rounded-md">
                <button
                  onClick={() => addCourse(eduIndex)}
                  className="text-sm text-gray-500 hover:text-[#4ECCA3]"
                >
                  + Add relevant courses
                </button>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Achievements & Activities
              </label>
              <button
                onClick={() => addAchievement(eduIndex)}
                className="text-xs flex items-center text-[#4ECCA3] hover:text-[#45B08C]"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add item
              </button>
            </div>
            
            {education.achievements && education.achievements.length > 0 ? (
              <div className="space-y-3">
                {education.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(eduIndex, achievementIndex, e.target.value)}
                        placeholder="Dean's List (2019-2020)"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removeAchievement(eduIndex, achievementIndex)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-3 border border-dashed border-gray-300 rounded-md">
                <button
                  onClick={() => addAchievement(eduIndex)}
                  className="text-sm text-gray-500 hover:text-[#4ECCA3]"
                >
                  + Add achievements, honors, or activities
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          onClick={addEducation}
          className="px-4 py-2 border border-[#4ECCA3] text-[#4ECCA3] rounded-md hover:bg-[#4ECCA3]/10 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 text-sm mb-2">Education Section Tips</h4>
        <ul className="text-sm text-gray-600 pl-5 list-disc space-y-2">
          <li><strong>Recent graduates</strong> - Place education at the top of your resume and include GPA if 3.0+</li>
          <li><strong>Experienced professionals</strong> - You can place education after work experience and omit graduation dates if preferred</li>
          <li><strong>Only include relevant courses</strong> - Focus on subjects that relate to your target position</li>
          <li><strong>Add certifications</strong> - Professional certifications can be added as separate education entries</li>
          <li><strong>Highlight achievements</strong> - Include academic honors, scholarships, and relevant extracurricular activities</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationStep;
