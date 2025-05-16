// This file contains the toggle switch implementations to replace the buttons in Additional Sections
// Replace the existing grid in ResumeCreator.tsx around line 1535 with this implementation:

/*
Replace this section:
<div className="grid grid-cols-2 gap-4">
  ... buttons ...
</div>

With this implementation:
*/

<div className="grid grid-cols-1 gap-4">
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center">
      <LanguagesIcon className="h-5 w-5 mr-3 text-gray-600" />
      <span className="text-sm">Languages</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={activeSections.includes('languages')}
        onChange={() => {
          if (activeSections.includes('languages')) {
            // Remove section
            setActiveSections(activeSections.filter(s => s !== 'languages'));
            
            // Clear the data
            const updatedCustomSections = {...resumeData.customSections};
            delete updatedCustomSections.languages;
            
            setResumeData({
              ...resumeData,
              customSections: updatedCustomSections
            });
          } else {
            // Add section
            setActiveSections([...activeSections, 'languages']);
            
            // Initialize with one empty entry
            setResumeData({
              ...resumeData,
              customSections: {
                ...resumeData.customSections,
                languages: ['']
              }
            });
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
  
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center">
      <Award className="h-5 w-5 mr-3 text-gray-600" />
      <span className="text-sm">Certifications</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={activeSections.includes('certifications')}
        onChange={() => {
          if (activeSections.includes('certifications')) {
            // Remove section
            setActiveSections(activeSections.filter(s => s !== 'certifications'));
            
            // Clear the data
            const updatedCustomSections = {...resumeData.customSections};
            delete updatedCustomSections.certifications;
            
            setResumeData({
              ...resumeData,
              customSections: updatedCustomSections
            });
          } else {
            // Add section
            setActiveSections([...activeSections, 'certifications']);
            
            // Initialize with one empty entry
            setResumeData({
              ...resumeData,
              customSections: {
                ...resumeData.customSections,
                certifications: ['']
              }
            });
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
  
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center">
      <FolderIcon className="h-5 w-5 mr-3 text-gray-600" />
      <span className="text-sm">Projects</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={activeSections.includes('projects')}
        onChange={() => {
          if (activeSections.includes('projects')) {
            // Remove section
            setActiveSections(activeSections.filter(s => s !== 'projects'));
            
            // Clear the data
            const updatedCustomSections = {...resumeData.customSections};
            delete updatedCustomSections.projects;
            
            setResumeData({
              ...resumeData,
              customSections: updatedCustomSections
            });
          } else {
            // Add section
            setActiveSections([...activeSections, 'projects']);
            
            // Initialize with one empty entry
            setResumeData({
              ...resumeData,
              customSections: {
                ...resumeData.customSections,
                projects: ['']
              }
            });
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
  
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center">
      <Heart className="h-5 w-5 mr-3 text-gray-600" />
      <span className="text-sm">Interests</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={activeSections.includes('interests')}
        onChange={() => {
          if (activeSections.includes('interests')) {
            // Remove section
            setActiveSections(activeSections.filter(s => s !== 'interests'));
            
            // Clear the data
            const updatedCustomSections = {...resumeData.customSections};
            delete updatedCustomSections.interests;
            
            setResumeData({
              ...resumeData,
              customSections: updatedCustomSections
            });
          } else {
            // Add section
            setActiveSections([...activeSections, 'interests']);
            
            // Initialize with one empty entry
            setResumeData({
              ...resumeData,
              customSections: {
                ...resumeData.customSections,
                interests: ['']
              }
            });
          }
        }}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
</div>
