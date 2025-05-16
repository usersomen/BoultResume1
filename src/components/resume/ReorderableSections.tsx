import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grip, Plus, Trash2, ChevronUp, ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReorderableSectionsProps {
  activeSections: string[];
  setActiveSections: (sections: string[]) => void;
  customSections: { [key: string]: string[] };
  setCustomSections: (sections: { [key: string]: string[] }) => void;
  onClose: () => void;
}

const ReorderableSections: React.FC<ReorderableSectionsProps> = ({
  activeSections,
  setActiveSections,
  customSections,
  setCustomSections,
  onClose
}) => {
  const [newSectionName, setNewSectionName] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  
  // Define section categories for better organization
  const sectionCategories = {
    essential: [
      { id: 'contact', name: 'Contact Information', description: 'Personal contact details' },
      { id: 'summary', name: 'Professional Summary', description: 'Brief overview of your career' },
      { id: 'employment', name: 'Work Experience', description: 'Employment history' },
      { id: 'education', name: 'Education', description: 'Academic background' },
      { id: 'skills', name: 'Skills', description: 'Professional competencies' }
    ],
    additional: [
      { id: 'certifications', name: 'Certifications', description: 'Professional certifications' },
      { id: 'projects', name: 'Projects', description: 'Notable projects' },
      { id: 'awards', name: 'Awards & Achievements', description: 'Recognition and accomplishments' },
      { id: 'languages', name: 'Languages', description: 'Language proficiencies' },
      { id: 'interests', name: 'Interests', description: 'Personal interests and hobbies' },
      { id: 'links', name: 'Links', description: 'Websites, portfolios, and social media' }
    ]
  };
  
  // Create a list of custom sections with proper formatting
  const formattedCustomSections = useMemo(() => {
    return Object.keys(customSections).map(key => ({ 
      id: key, 
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      description: 'Custom section',
      isCustom: true
    }));
  }, [customSections]);
  
  // Combine all sections for reference
  const allSections = useMemo(() => {
    return [
      ...sectionCategories.essential,
      ...sectionCategories.additional,
      ...formattedCustomSections
    ];
  }, [sectionCategories, formattedCustomSections]);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedSections = [...activeSections];
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);
    
    setActiveSections(reorderedSections);
  };
  
  const handleToggleSection = (sectionId: string) => {
    if (activeSections.includes(sectionId)) {
      setActiveSections(activeSections.filter(id => id !== sectionId));
    } else {
      setActiveSections([...activeSections, sectionId]);
    }
  };
  
  const handleAddCustomSection = () => {
    if (newSectionName.trim()) {
      const sectionId = newSectionName.trim().toLowerCase().replace(/\s+/g, '_');
      
      // Check if section already exists
      if (allSections.some(section => section.id === sectionId)) {
        alert('A section with this name already exists. Please choose a different name.');
        return;
      }
      
      // Add to custom sections
      setCustomSections({
        ...customSections,
        [sectionId]: []
      });
      
      // Add to active sections if not already there
      if (!activeSections.includes(sectionId)) {
        setActiveSections([...activeSections, sectionId]);
      }
      
      setNewSectionName('');
    }
  };
  
  const handleDeleteSection = (sectionId: string) => {
    // Remove from active sections
    setActiveSections(activeSections.filter(id => id !== sectionId));
    
    // If it's a custom section, remove it from custom sections
    if (customSections[sectionId]) {
      const updatedCustomSections = { ...customSections };
      delete updatedCustomSections[sectionId];
      setCustomSections(updatedCustomSections);
    }
  };
  
  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = activeSections.indexOf(sectionId);
    if (index === -1) return;
    
    const newSections = [...activeSections];
    
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < activeSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    
    setActiveSections(newSections);
  };
  
  // Get section details by ID
  const getSectionById = (sectionId: string) => {
    return allSections.find(s => s.id === sectionId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Manage Resume Sections</h2>
            <button 
              onClick={() => setShowHelp(!showHelp)}
              className="ml-2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              aria-label="Section management help"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        {showHelp && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="mb-2"><strong>Section Management Tips:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Drag sections to reorder them on your resume</li>
              <li>Use the up/down arrows to fine-tune positioning</li>
              <li>Remove sections you don't need with the trash icon</li>
              <li>Add custom sections for specialized content</li>
              <li>Changes are saved automatically</li>
            </ul>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span>Active Sections</span>
            <span className="ml-2 text-sm text-white bg-blue-500 px-2 py-0.5 rounded-full">
              {activeSections.length}
            </span>
          </h3>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="active-sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {activeSections.length > 0 ? (
                    activeSections.map((sectionId, index) => {
                      const section = getSectionById(sectionId);
                      if (!section) return null;
                      
                      const isCustom = 'isCustom' in section && section.isCustom;
                      
                      return (
                        <Draggable key={sectionId} draggableId={sectionId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                isCustom 
                                  ? 'bg-purple-50 border-purple-200' 
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="mr-3 cursor-move">
                                  <Grip className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                  <span className="font-medium">{section.name}</span>
                                  {section.description && (
                                    <p className="text-xs text-gray-500">{section.description}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => moveSection(sectionId, 'up')}
                                  className="p-1 rounded-full hover:bg-gray-200"
                                  disabled={index === 0}
                                  aria-label="Move section up"
                                >
                                  <ChevronUp className={`w-4 h-4 ${index === 0 ? 'text-gray-300' : 'text-gray-600'}`} />
                                </button>
                                <button
                                  onClick={() => moveSection(sectionId, 'down')}
                                  className="p-1 rounded-full hover:bg-gray-200"
                                  disabled={index === activeSections.length - 1}
                                  aria-label="Move section down"
                                >
                                  <ChevronDown className={`w-4 h-4 ${index === activeSections.length - 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                                </button>
                                <button
                                  onClick={() => handleToggleSection(sectionId)}
                                  className="p-1 rounded-full hover:bg-red-100"
                                  aria-label="Remove section"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                      No active sections. Add sections from below.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Essential Sections</h3>
          <div className="space-y-2 mb-4">
            {sectionCategories.essential
              .filter(section => !activeSections.includes(section.id))
              .map(section => (
                <div 
                  key={section.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <span>{section.name}</span>
                    {section.description && (
                      <p className="text-xs text-gray-500">{section.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleSection(section.id)}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    Add
                  </button>
                </div>
              ))}
          </div>
          
          <h3 className="text-lg font-medium mb-3">Additional Sections</h3>
          <div className="space-y-2 mb-4">
            {sectionCategories.additional
              .filter(section => !activeSections.includes(section.id))
              .map(section => (
                <div 
                  key={section.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <span>{section.name}</span>
                    {section.description && (
                      <p className="text-xs text-gray-500">{section.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleSection(section.id)}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    Add
                  </button>
                </div>
              ))}
          </div>
          
          {formattedCustomSections.length > 0 && !activeSections.some(id => formattedCustomSections.find(s => s.id === id)) && (
            <>
              <h3 className="text-lg font-medium mb-3">Custom Sections</h3>
              <div className="space-y-2 mb-4">
                {formattedCustomSections
                  .filter(section => !activeSections.includes(section.id))
                  .map(section => (
                    <div 
                      key={section.id}
                      className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200 hover:border-purple-300 hover:bg-purple-100 transition-colors"
                    >
                      <div>
                        <span>{section.name}</span>
                        <p className="text-xs text-purple-600">Custom section</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleSection(section.id)}
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-1 rounded-md hover:bg-red-100"
                          aria-label="Delete custom section"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Add Custom Section</h3>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter section name"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddCustomSection}
              disabled={!newSectionName.trim()}
              className={`px-4 py-2 rounded-lg flex items-center ${
                newSectionName.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ReorderableSections;
