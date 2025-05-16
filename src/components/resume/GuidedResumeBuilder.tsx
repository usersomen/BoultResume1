import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Lightbulb } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import {
  PersonalInfoStep,
  ProfessionalSummaryStep,
  WorkExperienceStep,
  EducationStep,
  SkillsStep,
  AdditionalSectionsStep,
  ReviewFinalizeStep
} from './steps';

interface GuidedResumeBuilderProps {
  show: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<ResumeData>) => void;
  resumeData: ResumeData;
}

// Define the steps of the guided resume building process
const GUIDED_STEPS = [
  {
    id: 'personalInfo',
    title: 'Personal Information',
    description: 'Start with your basic contact information',
  },
  {
    id: 'professionalSummary',
    title: 'Professional Summary',
    description: 'Highlight your career goals and qualifications',
  },
  {
    id: 'workExperience',
    title: 'Work Experience',
    description: 'List your relevant professional experience',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Add your educational background',
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Showcase your relevant skills and competencies',
  },
  {
    id: 'additionalSections',
    title: 'Additional Sections',
    description: 'Add other relevant sections to your resume',
  },
  {
    id: 'review',
    title: 'Review & Finalize',
    description: 'Review your resume and make final adjustments',
  }
];

const GuidedResumeBuilder: React.FC<GuidedResumeBuilderProps> = ({
  show,
  onClose,
  onSave,
  resumeData
}) => {
  // Track the current step
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [updatedResumeData, setUpdatedResumeData] = useState<Partial<ResumeData>>({...resumeData});
  
  // Determine if we can proceed to the next step
  const canProceed = () => {
    const currentStep = GUIDED_STEPS[currentStepIndex];
    
    // Logic to validate if the current step is complete
    switch (currentStep.id) {
      case 'personalInfo':
        return !!(updatedResumeData.personalInfo?.name && updatedResumeData.personalInfo?.email);
      case 'professionalSummary':
        return !!updatedResumeData.summary;
      case 'workExperience':
        return updatedResumeData.experience && updatedResumeData.experience.length > 0;
      case 'education':
        return updatedResumeData.education && updatedResumeData.education.length > 0;
      case 'skills':
        return updatedResumeData.skills && updatedResumeData.skills.length > 0;
      default:
        return true;
    }
  };
  
  // Move to the next step
  const handleNext = () => {
    if (currentStepIndex < GUIDED_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleFinish();
    }
  };
  
  // Move to the previous step
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  // Finish the guided process
  const handleFinish = () => {
    onSave(updatedResumeData);
    onClose();
  };
  
  // Update resume data for a specific section
  const updateSectionData = (sectionId: string, sectionData: any) => {
    setUpdatedResumeData(prev => ({
      ...prev,
      [sectionId]: sectionData
    }));
  };
  
  // Update multiple sections at once
  const updateMultipleSections = (sectionsData: Partial<ResumeData>) => {
    setUpdatedResumeData(prev => ({
      ...prev,
      ...sectionsData
    }));
  };
  
  // If the modal shouldn't be shown, return nothing
  if (!show) return null;
  
  const currentStep = GUIDED_STEPS[currentStepIndex];
  
  // Render the appropriate step component
  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'personalInfo':
        return (
          <PersonalInfoStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(personalInfo) => updateSectionData('personalInfo', personalInfo)}
          />
        );
      case 'professionalSummary':
        return (
          <ProfessionalSummaryStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(summary) => updateSectionData('summary', summary)}
          />
        );
      case 'workExperience':
        return (
          <WorkExperienceStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(experience) => updateSectionData('experience', experience)}
          />
        );
      case 'education':
        return (
          <EducationStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(education) => updateSectionData('education', education)}
          />
        );
      case 'skills':
        return (
          <SkillsStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(skills) => updateSectionData('skills', skills)}
          />
        );
      case 'additionalSections':
        return (
          <AdditionalSectionsStep
            resumeData={updatedResumeData as ResumeData}
            onUpdate={(sectionsData) => updateMultipleSections(sectionsData)}
          />
        );
      case 'review':
        return (
          <ReviewFinalizeStep
            resumeData={updatedResumeData as ResumeData}
            onEdit={(sectionId) => {
              // Map section ID to step index
              const stepMap: Record<string, number> = {
                'personalInfo': 0,
                'summary': 1,
                'experience': 2,
                'education': 3,
                'skills': 4,
                'additionalSections': 5
              };
              if (sectionId in stepMap) {
                setCurrentStepIndex(stepMap[sectionId]);
              }
            }}
            onFinish={handleFinish}
          />
        );
      default:
        return (
          <div className="text-center p-8 text-gray-500">
            Unknown step
          </div>
        );
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-10"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Resume Builder Assistant</h2>
            <div className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {GUIDED_STEPS.length}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex h-full">
              {/* Sidebar with steps */}
              <div className="w-64 border-r bg-gray-50 p-4">
                <div className="space-y-1">
                  {GUIDED_STEPS.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStepIndex(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                        index === currentStepIndex
                          ? 'bg-[#4ECCA3] text-white'
                          : index < currentStepIndex
                          ? 'bg-[#4ECCA3]/10 text-[#4ECCA3]'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs ${
                        index === currentStepIndex
                          ? 'bg-white text-[#4ECCA3]'
                          : index < currentStepIndex
                          ? 'bg-[#4ECCA3] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {index < currentStepIndex ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span>{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{currentStep.title}</h3>
                  <p className="text-gray-600">{currentStep.description}</p>
                </div>
                
                {/* The step component */}
                {renderStepContent()}
              </div>
            </div>
          </div>
          
          {/* Footer with navigation buttons */}
          <div className="p-4 border-t flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentStepIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            
            {currentStep.id !== 'review' && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  canProceed()
                    ? 'bg-[#4ECCA3] text-white hover:bg-[#45B08C]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuidedResumeBuilder;
