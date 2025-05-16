import React, { useState } from 'react';
import { Plus, FileText, Download, PaintBucket, Settings, Printer, HelpCircle } from 'lucide-react';
import GuidedResumeBuilder from './GuidedResumeBuilder';
import TemplateSelector from './TemplateSelector';
import ExportOptions from './ExportOptions';
import PrintCustomization from './PrintCustomization';
import { ResumeData } from '../../types/resume';

// Mock initial resume data
const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    photo: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  templateId: 'default'
};

const ResumeBuilder: React.FC = () => {
  // State for resume data
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  
  // State for UI modals
  const [showGuidedBuilder, setShowGuidedBuilder] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showPrintSettings, setShowPrintSettings] = useState(false);
  
  // Resume editing functions
  const handleResumeDataUpdate = (updatedData: Partial<ResumeData>) => {
    setResumeData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };
  
  // Calculate completion percentage for the progress bar
  const calculateCompletion = (): number => {
    let completed = 0;
    let total = 5; // Core sections: personal info, summary, experience, education, skills
    
    // Check personal info
    if (resumeData.personalInfo?.name && resumeData.personalInfo?.email) {
      completed++;
    }
    
    // Check summary
    if (resumeData.summary && resumeData.summary.length > 30) {
      completed++;
    }
    
    // Check experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      completed++;
    }
    
    // Check education
    if (resumeData.education && resumeData.education.length > 0) {
      completed++;
    }
    
    // Check skills
    if (resumeData.skills && resumeData.skills.length >= 3) {
      completed++;
    }
    
    return Math.round((completed / total) * 100);
  };
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setResumeData(prevData => ({
      ...prevData,
      templateId
    }));
    setShowTemplateSelector(false);
  };
  
  // UI helpers
  const getProgressColor = (percentage: number): string => {
    if (percentage < 33) return 'bg-red-500';
    if (percentage < 66) return 'bg-yellow-500';
    return 'bg-[#4ECCA3]';
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header with actions */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Resume Builder</h1>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowGuidedBuilder(true)}
            className="px-4 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C] flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Build Resume
          </button>
          
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-gray-700"
          >
            <PaintBucket className="h-4 w-4 mr-2" />
            Templates
          </button>
          
          <button
            onClick={() => setShowExportOptions(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          
          <button
            onClick={() => setShowPrintSettings(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-gray-700"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Resume editing panel */}
        <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto flex flex-col">
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">Resume Progress</h2>
              <span className="text-sm font-semibold">{calculateCompletion()}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${getProgressColor(calculateCompletion())} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${calculateCompletion()}%` }}
              />
            </div>
            
            <button
              onClick={() => setShowGuidedBuilder(true)}
              className="mt-3 text-[#4ECCA3] text-sm font-medium hover:underline w-full text-center"
            >
              Continue Building
            </button>
          </div>
          
          <div className="bg-white rounded-lg border p-4 mb-4">
            <h2 className="font-medium mb-3">Quick Tips</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <HelpCircle className="h-4 w-4 text-[#4ECCA3] mr-2 flex-shrink-0 mt-0.5" />
                Use the guided builder for a step-by-step experience
              </li>
              <li className="flex items-start">
                <HelpCircle className="h-4 w-4 text-[#4ECCA3] mr-2 flex-shrink-0 mt-0.5" />
                Choose a template that best fits your target industry
              </li>
              <li className="flex items-start">
                <HelpCircle className="h-4 w-4 text-[#4ECCA3] mr-2 flex-shrink-0 mt-0.5" />
                Customize your export settings for different platforms
              </li>
              <li className="flex items-start">
                <HelpCircle className="h-4 w-4 text-[#4ECCA3] mr-2 flex-shrink-0 mt-0.5" />
                Preview your resume before printing or downloading
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-medium mb-3">Current Template</h2>
            <div className="border rounded-lg overflow-hidden">
              <div 
                className="h-24 w-full flex items-center justify-center"
                style={{ 
                  backgroundColor: resumeData.templateId === 'default' ? '#4ECCA3' : 
                                  resumeData.templateId === 'modern' ? '#FF6B6B' : 
                                  resumeData.templateId === 'minimal' ? '#4D96FF' : 
                                  resumeData.templateId === 'creative' ? '#FFD93D' : '#6D67E4'
                }}
              >
                <span className="text-white font-medium">
                  {resumeData.templateId === 'default' ? 'Professional' : 
                   resumeData.templateId === 'modern' ? 'Modern' : 
                   resumeData.templateId === 'minimal' ? 'Minimal' : 
                   resumeData.templateId === 'creative' ? 'Creative' : 'Executive'}
                </span>
              </div>
              <div className="p-3 text-center">
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="text-sm text-[#4ECCA3] font-medium hover:underline"
                >
                  Change Template
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume preview panel */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto p-6">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-[850px] h-[1100px] flex flex-col p-8">
            {resumeData.personalInfo?.name ? (
              <>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{resumeData.personalInfo.name}</h1>
                {resumeData.personalInfo.title && (
                  <h2 className="text-lg text-gray-600 mb-4">{resumeData.personalInfo.title}</h2>
                )}
                
                <div className="flex flex-wrap text-sm text-gray-700 mb-6">
                  {resumeData.personalInfo.email && (
                    <div className="mr-4 mb-2">{resumeData.personalInfo.email}</div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="mr-4 mb-2">{resumeData.personalInfo.phone}</div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="mr-4 mb-2">{resumeData.personalInfo.location}</div>
                  )}
                  {resumeData.personalInfo.linkedin && (
                    <div className="mr-4 mb-2">{resumeData.personalInfo.linkedin}</div>
                  )}
                </div>
                
                {resumeData.summary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">Professional Summary</h3>
                    <p className="text-gray-700">{resumeData.summary}</p>
                  </div>
                )}
                
                {resumeData.experience && resumeData.experience.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.position}</h4>
                          <span className="text-sm text-gray-600">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {resumeData.education && resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">Education</h3>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                          <span className="text-sm text-gray-600">
                            {edu.graduationDate}
                          </span>
                        </div>
                        <div className="text-gray-700">
                          {edu.school || edu.institution}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {resumeData.skills && resumeData.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1">Skills</h3>
                    <div className="flex flex-wrap">
                      {resumeData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
                <FileText className="h-12 w-12" />
                <div className="text-center max-w-md">
                  <h3 className="text-lg font-medium mb-2">Your Resume Preview</h3>
                  <p className="text-sm">Start building your resume using the guided builder or edit sections directly.</p>
                  <button
                    onClick={() => setShowGuidedBuilder(true)}
                    className="mt-4 px-6 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C]"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal components */}
      <GuidedResumeBuilder
        show={showGuidedBuilder}
        onClose={() => setShowGuidedBuilder(false)}
        onSave={handleResumeDataUpdate}
        resumeData={resumeData}
      />
      
      <TemplateSelector
        show={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelectTemplate={handleTemplateSelect}
        currentTemplate={resumeData.templateId || 'default'}
      />
      
      <ExportOptions
        show={showExportOptions}
        onClose={() => setShowExportOptions(false)}
        resumeData={resumeData}
      />
      
      <PrintCustomization
        show={showPrintSettings}
        onClose={() => setShowPrintSettings(false)}
      />
    </div>
  );
};

export default ResumeBuilder;
