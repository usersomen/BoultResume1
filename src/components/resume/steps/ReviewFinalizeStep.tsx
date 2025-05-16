import React, { useState } from 'react';
import { Check, Edit2, ArrowRight, AlertCircle, Award, BookOpen } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface ReviewFinalizeStepProps {
  resumeData: ResumeData;
  onEdit: (sectionId: string) => void;
  onFinish: () => void;
}

interface SectionStatus {
  id: string;
  title: string;
  icon: React.ReactNode;
  isComplete: boolean;
  items?: number;
  requiredItems?: number;
}

const ReviewFinalizeStep: React.FC<ReviewFinalizeStepProps> = ({
  resumeData,
  onEdit,
  onFinish
}) => {
  const [showFinalTips, setShowFinalTips] = useState(false);
  
  // Check completion status of each section
  const sectionStatus: SectionStatus[] = [
    {
      id: 'personalInfo',
      title: 'Personal Information',
      icon: <Check className="h-4 w-4" />,
      isComplete: !!(resumeData.personalInfo?.name && resumeData.personalInfo?.email)
    },
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: <Check className="h-4 w-4" />,
      isComplete: !!resumeData.summary && resumeData.summary.length >= 30
    },
    {
      id: 'experience',
      title: 'Work Experience',
      icon: <Check className="h-4 w-4" />,
      isComplete: !!(resumeData.experience && resumeData.experience.length > 0 && 
                  resumeData.experience[0].company && resumeData.experience[0].position),
      items: resumeData.experience?.length || 0,
      requiredItems: 1
    },
    {
      id: 'education',
      title: 'Education',
      icon: <Check className="h-4 w-4" />,
      isComplete: !!(resumeData.education && resumeData.education.length > 0 && 
                  resumeData.education[0].institution),
      items: resumeData.education?.length || 0,
      requiredItems: 1
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: <Check className="h-4 w-4" />,
      isComplete: !!(resumeData.skills && resumeData.skills.length >= 3),
      items: resumeData.skills?.length || 0,
      requiredItems: 3
    }
  ];
  
  // Count how many sections are complete
  const completedSections = sectionStatus.filter(section => section.isComplete).length;
  const totalSections = sectionStatus.length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);
  
  // Get additional sections
  const additionalSectionIds = Object.keys(resumeData).filter(key => 
    !['personalInfo', 'summary', 'experience', 'education', 'skills'].includes(key) &&
    Array.isArray(resumeData[key as keyof ResumeData]) && 
    (resumeData[key as keyof ResumeData] as any[]).length > 0
  );
  
  const getSectionDisplayName = (sectionId: string): string => {
    switch(sectionId) {
      case 'certifications': return 'Certifications';
      case 'projects': return 'Projects';
      case 'languages': return 'Languages';
      case 'volunteer': return 'Volunteer Experience';
      case 'publications': return 'Publications';
      case 'organizations': return 'Organizations';
      case 'conferences': return 'Conferences & Events';
      default: return sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }
  };
  
  const getSectionIcon = (sectionId: string): React.ReactNode => {
    switch(sectionId) {
      case 'certifications': return <Award className="h-4 w-4" />;
      case 'publications': return <BookOpen className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          Review your resume information below. You can go back to edit any section if needed. Once you're satisfied, click "Finish" to complete your resume.
        </p>
      </div>
      
      {/* Progress overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Resume Completion</h3>
          <span className="text-sm font-medium text-[#4ECCA3]">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-[#4ECCA3] h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        {completionPercentage < 100 ? (
          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-700">
              Your resume is incomplete. Consider completing all sections for a stronger resume.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 p-3 rounded-md border border-green-100 flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Great job! Your resume is complete. Review the information and make any final adjustments.
            </p>
          </div>
        )}
      </div>
      
      {/* Core sections review */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Core Sections</h3>
        
        <div className="space-y-3">
          {sectionStatus.map(section => (
            <div 
              key={section.id}
              className={`border rounded-lg p-4 flex justify-between items-center ${
                section.isComplete ? 'border-gray-200 bg-white' : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  section.isComplete ? 'bg-[#4ECCA3]/10 text-[#4ECCA3]' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {section.isComplete ? section.icon : <AlertCircle className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{section.title}</h4>
                  {section.items !== undefined && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {section.items} {section.items === 1 ? 'item' : 'items'} added
                      {section.requiredItems && !section.isComplete && 
                        ` (${section.requiredItems} required)`
                      }
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => onEdit(section.id)}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                  section.isComplete 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                {section.isComplete ? 'Edit' : 'Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional sections review */}
      {additionalSectionIds.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Sections</h3>
          
          <div className="space-y-3">
            {additionalSectionIds.map(sectionId => {
              const items = (resumeData[sectionId as keyof ResumeData] as any[]).length;
              return (
                <div 
                  key={sectionId}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#4ECCA3]/10 text-[#4ECCA3] flex items-center justify-center mr-3">
                      {getSectionIcon(sectionId)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{getSectionDisplayName(sectionId)}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {items} {items === 1 ? 'item' : 'items'} added
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onEdit('additionalSections')}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md text-sm flex items-center"
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Final review tips */}
      <div>
        <button
          onClick={() => setShowFinalTips(!showFinalTips)}
          className="text-[#4ECCA3] font-medium text-sm hover:text-[#45B08C] focus:outline-none"
        >
          {showFinalTips ? 'Hide final resume tips' : 'Show final resume tips'}
        </button>
        
        {showFinalTips && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="font-medium text-gray-800">Before You Finish</h4>
            
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Check for spelling and grammar errors</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Ensure all dates are accurate and in the correct format</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Verify contact information is current and professional</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Use action verbs and quantify achievements where possible</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Remove any irrelevant information that doesn't support your job target</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Review your resume's visual appearance and ensure consistent formatting</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-[#4ECCA3] mr-2 mt-0.5" />
                <span>Tailor your resume for your specific target position</span>
              </li>
            </ul>
            
            <div className="bg-[#4ECCA3]/10 p-3 rounded-md">
              <p className="text-sm text-gray-700">
                <strong>Pro tip:</strong> After completing your resume, consider having a trusted colleague or mentor review it for feedback.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Finish button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onFinish}
          className={`px-8 py-3 rounded-lg text-white flex items-center font-medium ${
            completionPercentage === 100 
              ? 'bg-[#4ECCA3] hover:bg-[#45B08C]' 
              : 'bg-[#4ECCA3] opacity-90 hover:opacity-100'
          }`}
        >
          Finish and Build My Resume
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ReviewFinalizeStep;
