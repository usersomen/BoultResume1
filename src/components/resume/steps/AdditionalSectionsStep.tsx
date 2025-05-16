import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Award, Landmark, Globe, Heart, BookOpen, Languages, Zap } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface AdditionalSectionsStepProps {
  resumeData: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

// Section types with their metadata
const SECTION_TYPES = [
  {
    id: 'certifications',
    title: 'Certifications',
    icon: <Award className="h-5 w-5" />,
    description: 'Professional certifications and licenses',
    fields: ['name', 'issuer', 'date', 'url'],
    fieldLabels: {
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Date Obtained',
      url: 'Verification URL (optional)'
    }
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Zap className="h-5 w-5" />,
    description: 'Personal or professional projects you\'ve worked on',
    fields: ['name', 'description', 'role', 'url', 'startDate', 'endDate'],
    fieldLabels: {
      name: 'Project Name',
      description: 'Description',
      role: 'Your Role',
      url: 'Project URL (optional)',
      startDate: 'Start Date',
      endDate: 'End Date'
    }
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: <Languages className="h-5 w-5" />,
    description: 'Languages you speak',
    fields: ['language', 'proficiency'],
    fieldLabels: {
      language: 'Language',
      proficiency: 'Proficiency Level'
    }
  },
  {
    id: 'organizations',
    title: 'Organizations',
    icon: <Landmark className="h-5 w-5" />,
    description: 'Professional affiliations or memberships',
    fields: ['name', 'position', 'startDate', 'endDate', 'description'],
    fieldLabels: {
      name: 'Organization Name',
      position: 'Position/Role',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: 'Description of Activities'
    }
  },
  {
    id: 'volunteer',
    title: 'Volunteer Experience',
    icon: <Heart className="h-5 w-5" />,
    description: 'Volunteer work and community service',
    fields: ['organization', 'role', 'startDate', 'endDate', 'description'],
    fieldLabels: {
      organization: 'Organization',
      role: 'Role',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: 'Description of Activities'
    }
  },
  {
    id: 'publications',
    title: 'Publications',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Published articles, papers, or books',
    fields: ['title', 'publisher', 'date', 'url', 'description'],
    fieldLabels: {
      title: 'Title',
      publisher: 'Publisher/Journal',
      date: 'Publication Date',
      url: 'URL (optional)',
      description: 'Brief Description'
    }
  },
  {
    id: 'conferences',
    title: 'Conferences & Events',
    icon: <Globe className="h-5 w-5" />,
    description: 'Presentations, talks, or conferences attended',
    fields: ['name', 'organizer', 'date', 'location', 'description'],
    fieldLabels: {
      name: 'Conference/Event Name',
      organizer: 'Organizer',
      date: 'Date',
      location: 'Location',
      description: 'Your Contribution/Participation'
    }
  }
];

// Helper to create an empty item for a section
const createEmptyItem = (sectionType: string) => {
  const section = SECTION_TYPES.find(s => s.id === sectionType);
  if (!section) return {};
  
  const emptyItem: Record<string, string> = {};
  section.fields.forEach(field => {
    emptyItem[field] = '';
  });
  
  return emptyItem;
};

const AdditionalSectionsStep: React.FC<AdditionalSectionsStepProps> = ({
  resumeData,
  onUpdate
}) => {
  // Initialize state with existing data or empty arrays
  const [activeSections, setActiveSections] = useState<string[]>(
    Object.keys(resumeData).filter(key => 
      SECTION_TYPES.map(s => s.id).includes(key) && 
      Array.isArray(resumeData[key as keyof ResumeData]) && 
      (resumeData[key as keyof ResumeData] as any[]).length > 0
    )
  );
  
  const [expandedSections, setExpandedSections] = useState<string[]>(activeSections);
  
  const [sectionData, setSectionData] = useState<Record<string, any[]>>(() => {
    const initialData: Record<string, any[]> = {};
    SECTION_TYPES.forEach(section => {
      const sectionId = section.id;
      initialData[sectionId] = resumeData[sectionId as keyof ResumeData] as any[] || [];
    });
    return initialData;
  });
  
  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  const addSection = (sectionId: string) => {
    if (!activeSections.includes(sectionId)) {
      const updatedSections = [...activeSections, sectionId];
      setActiveSections(updatedSections);
      setExpandedSections([...expandedSections, sectionId]);
      
      // If the section has no items, add one empty item
      if (sectionData[sectionId].length === 0) {
        const updatedData = { ...sectionData };
        updatedData[sectionId] = [createEmptyItem(sectionId)];
        setSectionData(updatedData);
        
        // Update parent component
        const dataUpdate: Partial<ResumeData> = {};
        dataUpdate[sectionId as keyof ResumeData] = updatedData[sectionId] as any;
        onUpdate(dataUpdate);
      }
    }
  };
  
  const removeSection = (sectionId: string) => {
    setActiveSections(activeSections.filter(id => id !== sectionId));
    setExpandedSections(expandedSections.filter(id => id !== sectionId));
    
    // Clear the section data in parent component
    const dataUpdate: Partial<ResumeData> = {};
    dataUpdate[sectionId as keyof ResumeData] = [] as any;
    onUpdate(dataUpdate);
  };
  
  const addItemToSection = (sectionId: string) => {
    const updatedData = { ...sectionData };
    updatedData[sectionId] = [...sectionData[sectionId], createEmptyItem(sectionId)];
    setSectionData(updatedData);
    
    // Update parent component
    const dataUpdate: Partial<ResumeData> = {};
    dataUpdate[sectionId as keyof ResumeData] = updatedData[sectionId] as any;
    onUpdate(dataUpdate);
  };
  
  const updateSectionItem = (sectionId: string, itemIndex: number, field: string, value: string) => {
    const updatedData = { ...sectionData };
    updatedData[sectionId] = [...sectionData[sectionId]];
    updatedData[sectionId][itemIndex] = {
      ...updatedData[sectionId][itemIndex],
      [field]: value
    };
    setSectionData(updatedData);
    
    // Update parent component
    const dataUpdate: Partial<ResumeData> = {};
    dataUpdate[sectionId as keyof ResumeData] = updatedData[sectionId] as any;
    onUpdate(dataUpdate);
  };
  
  const removeItemFromSection = (sectionId: string, itemIndex: number) => {
    const updatedData = { ...sectionData };
    updatedData[sectionId] = sectionData[sectionId].filter((_, i) => i !== itemIndex);
    setSectionData(updatedData);
    
    // If removing the last item, deactivate the section
    if (updatedData[sectionId].length === 0) {
      removeSection(sectionId);
      return;
    }
    
    // Update parent component
    const dataUpdate: Partial<ResumeData> = {};
    dataUpdate[sectionId as keyof ResumeData] = updatedData[sectionId] as any;
    onUpdate(dataUpdate);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          Enhance your resume with additional sections to showcase other qualifications, achievements, and experiences relevant to your target position.
        </p>
      </div>
      
      {/* Active Sections */}
      {activeSections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Your Additional Sections</h3>
          
          {activeSections.map(sectionId => {
            const section = SECTION_TYPES.find(s => s.id === sectionId);
            if (!section) return null;
            
            return (
              <div key={sectionId} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Section Header */}
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#4ECCA3]/10 text-[#4ECCA3] flex items-center justify-center mr-3">
                      {section.icon}
                    </div>
                    <h4 className="font-medium text-gray-800">{section.title}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSectionExpansion(sectionId)}
                      className="p-1 text-gray-500 hover:bg-gray-100 rounded-md"
                    >
                      {expandedSections.includes(sectionId) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => removeSection(sectionId)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Section Content */}
                {expandedSections.includes(sectionId) && (
                  <div className="p-4 space-y-4">
                    {sectionData[sectionId].map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="border border-gray-200 rounded-lg p-3 space-y-3"
                      >
                        {/* Item Header */}
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium text-gray-700">
                            {item.name || item.title || item.language || item.organization || `Item ${itemIndex + 1}`}
                          </h5>
                          <button
                            onClick={() => removeItemFromSection(sectionId, itemIndex)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Item Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.fields.map(field => (
                            <div key={field} className={field === 'description' ? 'md:col-span-2' : ''}>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                {section.fieldLabels[field]}
                              </label>
                              
                              {field === 'description' ? (
                                <textarea
                                  value={item[field] || ''}
                                  onChange={(e) => updateSectionItem(sectionId, itemIndex, field, e.target.value)}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] text-sm resize-none"
                                ></textarea>
                              ) : field.includes('Date') ? (
                                <input
                                  type="month"
                                  value={item[field] || ''}
                                  onChange={(e) => updateSectionItem(sectionId, itemIndex, field, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] text-sm"
                                />
                              ) : field === 'proficiency' ? (
                                <select
                                  value={item[field] || ''}
                                  onChange={(e) => updateSectionItem(sectionId, itemIndex, field, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] text-sm"
                                >
                                  <option value="">Select proficiency level</option>
                                  <option value="Native or Bilingual">Native or Bilingual</option>
                                  <option value="Fluent">Fluent</option>
                                  <option value="Advanced">Advanced</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Basic">Basic</option>
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={item[field] || ''}
                                  onChange={(e) => updateSectionItem(sectionId, itemIndex, field, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] text-sm"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                      <button
                        onClick={() => addItemToSection(sectionId)}
                        className="px-4 py-2 border border-[#4ECCA3] text-[#4ECCA3] rounded-md hover:bg-[#4ECCA3]/10 flex items-center text-sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another {section.title.replace(/s$/, '')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Available Sections to Add */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Add More Sections</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SECTION_TYPES.filter(section => !activeSections.includes(section.id)).map(section => (
            <button
              key={section.id}
              onClick={() => addSection(section.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#4ECCA3] hover:bg-[#4ECCA3]/5 flex items-start text-left transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#4ECCA3]/10 text-[#4ECCA3] flex items-center justify-center mr-3 flex-shrink-0">
                {section.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{section.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{section.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Guidance */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 text-sm mb-2">When to Add Additional Sections</h4>
        <ul className="text-sm text-gray-600 pl-5 list-disc space-y-2">
          <li><strong>Early career professionals</strong> - Use additional sections to compensate for limited work experience</li>
          <li><strong>Career changers</strong> - Highlight transferable skills through projects, certifications, or volunteer work</li>
          <li><strong>Industry-specific qualifications</strong> - Include sections particularly valued in your target industry</li>
          <li><strong>International job seekers</strong> - Add language proficiencies and international experience</li>
          <li><strong>Quality over quantity</strong> - Only include sections relevant to your target position</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalSectionsStep;
