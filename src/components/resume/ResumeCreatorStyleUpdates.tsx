// This file contains styling updates for the ResumeCreator component to match the landing page theme
// You should update the styling in your ResumeCreator.tsx file according to these suggestions

/* 
1. Update the left panel background and text colors:
*/
<div className="w-1/2 overflow-y-auto p-6 border-r border-gray-700 bg-gray-900 text-white">

/* 
2. Update the header styling:
*/
<div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-white">Resume Creator</h1>
  <div className="flex space-x-2">
    <button 
      onClick={navigateBack}
      className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors mr-2 border border-gray-700"
    >
      Dashboard
    </button>
    <button 
      onClick={saveProgress}
      className="px-4 py-2 bg-[#4ECCA3] text-white text-sm rounded-lg hover:bg-[#45B08C] transition-colors mr-2"
    >
      Save Progress
    </button>
    <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700">English</span>
  </div>
</div>

/* 
3. Update the resume progress section:
*/
<div className="mb-6 bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700">
  <div className="flex items-center">
    <div className="text-white text-sm font-medium bg-[#4ECCA3] rounded-full px-3 py-1 mr-2">{resumeScore}%</div>
    <span className="text-sm text-gray-300">Resume Progress</span>
  </div>
  <button className="text-sm text-[#4ECCA3] hover:text-[#45B08C] flex items-center">
    Try it <span className="ml-1">→</span>
  </button>
</div>

/* 
4. Update the section headers:
*/
<h2 className="text-xl font-bold text-white mb-4">Personal Details</h2>

/* 
5. Update form labels:
*/
<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name*</label>

/* 
6. Update input fields:
*/
<input
  type="text"
  id="name"
  className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-[#4ECCA3] focus:ring focus:ring-[#4ECCA3]/20"
  value={resumeData.name}
  onChange={(e) => handleInputChange('name', e.target.value)}
/>

/* 
7. Update accordion headers:
*/
<div
  className="flex justify-between items-center p-3 cursor-pointer bg-gray-800 hover:bg-gray-750 rounded-t-md border border-gray-700"
  onClick={() => toggleSection('employment')}
>
  <h2 className="text-lg font-medium text-white">Employment History</h2>
  {activeSection === 'employment' ? (
    <ChevronUp className="h-5 w-5 text-gray-300" />
  ) : (
    <ChevronDown className="h-5 w-5 text-gray-300" />
  )}
</div>

/* 
8. Update buttons and action elements:
*/
<button
  onClick={addEmployment}
  className="mt-3 w-full p-2 flex items-center justify-center gap-2 text-[#4ECCA3] border border-dashed border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
>
  <Plus className="h-4 w-4" />
  <span>Add Employment</span>
</button>

/* 
9. Update the add button for employment and education entries:
*/
<button
  onClick={removeEducation}
  className="p-1 text-gray-300 hover:text-red-400 transition-colors"
>
  <Trash2 className="h-4 w-4" />
</button>

/* 
10. Update toggle switches:
*/
<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4ECCA3]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ECCA3]"></div>

/* 
11. Update dividers and section containers:
*/
<div className="my-6 border-t border-gray-700"></div>

/* 
12. Update section containers:
*/
<div className="grid grid-cols-1 gap-4 mb-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
</div>
