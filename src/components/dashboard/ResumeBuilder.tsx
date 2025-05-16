import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, FileText, Eye, Download, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../templates/ResumeTemplates';

const categories = ['All', 'Professional', 'Creative', 'Simple', 'Modern'];

// Sample resume data for the list
const userResumes = [
  {
    id: 1,
    title: 'Software Engineer Resume',
    template: 'Modern Profile',
    lastUpdated: '2 days ago',
    progress: 85,
  },
  {
    id: 2,
    title: 'Product Manager Application',
    template: 'Executive',
    lastUpdated: '1 week ago',
    progress: 100,
  },
  {
    id: 3,
    title: 'UX Designer Portfolio',
    template: 'Creative',
    lastUpdated: '3 weeks ago',
    progress: 70,
  }
];

export default function ResumeBuilder() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(true); 
  const [showUserResumes, setShowUserResumes] = useState(false); 
  const navigate = useNavigate();

  const handleCreateNew = () => {
    setShowTemplates(true);
    setShowUserResumes(false);
  };

  const handleShowUserResumes = () => {
    setShowTemplates(false);
    setShowUserResumes(true);
  };

  const handleEditResume = (id) => {
    console.log(`Editing resume ${id}`);
  };

  const handleUseTemplate = (template) => {
    // Navigate to the resume creator with the selected template
    navigate(`/resume/create?template=${template.id}`);
  };

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Templates</h1>
          <p className="text-gray-600">Choose from our professionally designed templates</p>
        </div>
        <div className="flex gap-4">
          <motion.button
            onClick={handleShowUserResumes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 ${showUserResumes ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} px-6 py-3 rounded-xl font-medium transition-all`}
          >
            <FileText className="w-5 h-5" />
            Your Resumes
          </motion.button>
          
          <motion.button
            onClick={handleCreateNew}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 ${showTemplates ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} px-6 py-3 rounded-xl font-medium transition-all`}
          >
            <Plus className="w-5 h-5" />
            Templates
          </motion.button>
        </div>
      </div>

      {showUserResumes && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Your Resumes</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {userResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: 'rgba(78, 204, 163, 0.05)' }}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => handleEditResume(resume.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{resume.title}</h3>
                      <p className="text-gray-600">Template: {resume.template}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-sm text-gray-500">
                      Last updated: {resume.lastUpdated}
                    </div>
                    
                    <div className="w-full md:w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">Completion</span>
                        <span className="text-xs font-medium text-primary">{resume.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2" 
                          style={{ width: `${resume.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditResume(resume.id);
                      }}
                    >
                      Edit
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {userResumes.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 mb-4">You haven't created any resumes yet.</p>
                <motion.button
                  onClick={handleCreateNew}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Resume
                </motion.button>
              </div>
            )}
          </div>
        </>
      )}

      {showTemplates && (
        <>
          <div className="flex items-center justify-center gap-4 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {template.popular && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setPreviewTemplate(template)}
                      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button 
                      onClick={() => handleUseTemplate(template)}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Use
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewTemplate(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                {previewTemplate && (
                  React.createElement(previewTemplate.component, { resume: previewTemplate.sampleData })
                )}
              </div>

              <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all"
                >
                  <Download className="w-5 h-5" />
                  Use This Template
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}