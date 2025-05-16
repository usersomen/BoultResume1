import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ResumePageRendererProps {
  resumeData: ResumeData;
  page: number;
  pageCount: number;
  activeSections: string[];
  activeTemplate: string;
  profilePhoto: string | null;
  sectionPageMap: Record<string, number>;
  renderSectionContent: (section: string) => JSX.Element;
  refCallback: (element: HTMLElement | null) => void;
}

const ResumePageRenderer: React.FC<ResumePageRendererProps> = ({
  resumeData,
  page,
  pageCount,
  activeSections,
  activeTemplate,
  profilePhoto,
  sectionPageMap,
  renderSectionContent,
  refCallback
}) => {
  // Helper function to determine section type for styling purposes
  const getSectionType = (sectionId: string): 'essential' | 'additional' | 'custom' => {
    const essentialSections = ['contact', 'summary', 'employment', 'education', 'skills'];
    const additionalSections = ['certifications', 'projects', 'awards', 'languages', 'interests', 'links'];
    
    if (essentialSections.includes(sectionId)) return 'essential';
    if (additionalSections.includes(sectionId)) return 'additional';
    return 'custom';
  };
  
  // Helper function to apply template-specific styling to sections
  const getSectionClasses = (sectionId: string) => {
    const sectionType = getSectionType(sectionId);
    let baseClasses = "resume-section mb-6";
    
    // Add section type class
    baseClasses += ` resume-section-${sectionType}`;
    
    // Add template-specific classes
    if (activeTemplate === 'modern') {
      // Modern template styling
      if (sectionType === 'essential') {
        baseClasses += " border-l-4 border-gray-800 pl-3";
      } else if (sectionType === 'custom') {
        baseClasses += " border-l-4 border-purple-500 pl-3";
      }
    } else if (activeTemplate.includes('minimalist')) {
      // Minimalist template styling
      baseClasses += " pb-4";
    } else if (activeTemplate.includes('creative')) {
      // Creative template styling
      if (sectionType === 'custom') {
        baseClasses += " bg-gray-50 p-3 rounded-lg";
      }
    }
    
    return baseClasses;
  };
  
  return (
    <div 
      className="relative w-[595px] h-[842px] shadow-lg bg-white mx-auto overflow-hidden print:shadow-none" 
      ref={refCallback}
      id={`resume-page-${page}`}
      data-page={page}
      style={{ marginBottom: '20px' }}
    >
      <div className={`resume-${activeTemplate} h-full w-full`}>
        <div className="p-8 h-full w-full relative">
          {/* Header - show on first page and optionally on subsequent pages based on template */}
          {(page === 1 || activeTemplate === 'modern') && (
            <div 
              className={`resume-header mb-6 relative ${page > 1 ? 'opacity-80 scale-95' : ''}`} 
              style={page > 1 ? {marginBottom: '0.5rem'} : {}}
            >
              <h1 className="text-2xl font-bold">{resumeData.name || 'Your Name'}</h1>
              <h2 className="text-lg text-gray-600">{resumeData.title || 'Professional Title'}</h2>
              <div className="flex flex-wrap mt-2 gap-3 text-sm text-gray-600">
                {resumeData.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {resumeData.email}
                  </div>
                )}
                {resumeData.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {resumeData.phone}
                  </div>
                )}
                {resumeData.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {resumeData.location}
                  </div>
                )}
              </div>
              
              {profilePhoto && page === 1 && (
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
          
          {/* Content container with reserved space for footer */}
          <div className="resume-content overflow-hidden" style={{ 
            maxHeight: page === 1 ? 'calc(100% - 120px)' : 'calc(100% - 80px)',  // More space for header on first page
            marginBottom: '40px'  // Reduced from 50px to provide more space for content
          }}>
            {pageCount === 1 ? (
              // Single page - show all content
              <div>
                {activeSections
                  .filter(section => section !== 'personal')
                  .map(section => (
                    <div 
                      key={section} 
                      className={getSectionClasses(section)} 
                      data-section={section} 
                      data-page="1"
                      data-section-type={getSectionType(section)}
                      style={{ marginBottom: 'var(--resume-section-spacing)' }}
                    >
                      {renderSectionContent(section)}
                    </div>
                  ))}
              </div>
            ) : (
              // Multi-page content with proper section distribution
              <div>
                {activeSections
                  .filter(section => section !== 'personal')
                  .filter(section => {
                    // Only show sections assigned to this page
                    return sectionPageMap[section] === page;
                  })
                  .map(section => (
                    <div 
                      key={section} 
                      className={getSectionClasses(section)} 
                      data-section={section} 
                      data-page={page}
                      data-section-type={getSectionType(section)}
                      style={{ marginBottom: 'var(--resume-section-spacing)' }}
                    >
                      {renderSectionContent(section)}
                    </div>
                  ))}
              </div>
            )}
          </div>
          
          {/* Fixed footer at bottom - smaller height to prevent content overlap */}
          <div className="absolute bottom-4 left-8 right-8 z-10">
            <div className="border-t border-gray-200 pt-1 flex justify-between items-center bg-white">
              <div className="text-xs text-gray-400">
                {resumeData.name || 'Resume'}
              </div>
              {pageCount > 1 && (
                <div className="text-xs text-gray-400">
                  Page {page} of {pageCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePageRenderer;
