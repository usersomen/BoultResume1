# Resume Creator Theme Instructions

To update your ResumeCreator component to match the landing page theme, please make the following changes to `ResumeCreator.tsx`. These changes focus on the left panel and buttons only, leaving the right preview section unchanged.

## 1. Left Panel Background

```jsx
// Change this:
<div className="w-1/2 overflow-y-auto p-6 border-r border-gray-200">

// To this:
<div className="w-1/2 overflow-y-auto p-6 border-r border-gray-700 bg-gray-900 text-white">
```

## 2. Header and Buttons

```jsx
// Change this:
<div className="flex justify-between items-center mb-6">
  <h1 className="text-xl font-bold text-gray-900">Resume Creator</h1>
  <div className="flex space-x-2">
    <button 
      onClick={navigateBack}
      className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors mr-2"
    >
      Dashboard
    </button>
    <button 
      onClick={saveProgress}
      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors mr-2"
    >
      Save Progress
    </button>
    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">English</span>
  </div>
</div>

// To this:
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
```

## 3. Resume Progress Section

```jsx
// Change this:
<div className="mb-6 bg-red-50 rounded-lg p-4 flex items-center justify-between">
  <div className="flex items-center">
    <div className="text-red-500 text-sm font-medium bg-white border border-red-200 rounded-full px-2 py-0.5 mr-2">{resumeScore}%</div>
    <span className="text-sm text-gray-700">Resume Progress</span>
  </div>
  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
    Try it <span className="ml-1">→</span>
  </button>
</div>

// To this:
<div className="mb-6 bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700">
  <div className="flex items-center">
    <div className="text-white text-sm font-medium bg-[#4ECCA3] rounded-full px-3 py-1 mr-2">{resumeScore}%</div>
    <span className="text-sm text-gray-300">Resume Progress</span>
  </div>
  <button className="text-sm text-[#4ECCA3] hover:text-[#45B08C] flex items-center">
    Try it <span className="ml-1">→</span>
  </button>
</div>
```

## 4. Form Section Headers

```jsx
// Change this:
<h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h2>

// To this:
<h2 className="text-lg font-semibold text-white mb-4">Personal Details</h2>
```

## 5. Form Labels

```jsx
// Change this:
<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>

// To this:
<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name*</label>
```

## 6. Input Fields

```jsx
// Change this:
<input
  type="text"
  id="name"
  className="w-full p-2 border border-gray-300 rounded-md"
  value={resumeData.name}
  onChange={(e) => handleInputChange('name', e.target.value)}
/>

// To this:
<input
  type="text"
  id="name"
  className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:border-[#4ECCA3] focus:ring focus:ring-[#4ECCA3]/20"
  value={resumeData.name}
  onChange={(e) => handleInputChange('name', e.target.value)}
/>
```

## 7. Accordion Headers

```jsx
// Change this:
<div
  className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-t-md border border-gray-200"
  onClick={() => toggleSection('employment')}
>
  <h2 className="text-lg font-medium text-gray-900">Employment History</h2>
  {activeSection === 'employment' ? (
    <ChevronUp className="h-5 w-5 text-gray-500" />
  ) : (
    <ChevronDown className="h-5 w-5 text-gray-500" />
  )}
</div>

// To this:
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
```

## 8. Add Buttons

```jsx
// Change this:
<button
  onClick={addEmployment}
  className="mt-3 w-full p-2 flex items-center justify-center gap-2 text-blue-600 border border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
>
  <Plus className="h-4 w-4" />
  <span>Add Employment</span>
</button>

// To this:
<button
  onClick={addEmployment}
  className="mt-3 w-full p-2 flex items-center justify-center gap-2 text-[#4ECCA3] border border-dashed border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
>
  <Plus className="h-4 w-4" />
  <span>Add Employment</span>
</button>
```

## 9. Remove Buttons

```jsx
// Change this:
<button
  onClick={() => removeEducation(index)}
  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
>
  <Trash2 className="h-4 w-4" />
</button>

// To this:
<button
  onClick={() => removeEducation(index)}
  className="p-1 text-gray-300 hover:text-red-400 transition-colors"
>
  <Trash2 className="h-4 w-4" />
</button>
```

## 10. Toggle Switches

```jsx
// Change this:
<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>

// To this:
<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4ECCA3]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ECCA3]"></div>
```

## 11. Dividers

```jsx
// Change this:
<div className="my-6 border-t border-gray-200"></div>

// To this:
<div className="my-6 border-t border-gray-700"></div>
```

## 12. Section Container Backgrounds

```jsx
// Change this:
<div className="p-4 bg-white border border-gray-200 rounded-md mb-6">

// To this:
<div className="p-4 bg-gray-800 border border-gray-700 rounded-md mb-6">
```

These changes will transform the Resume Creator's left panel to match the dark theme with green accents used in the landing page, while maintaining all functionality.
