import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, X, Check, ArrowLeft, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { templates } from '../templates/ResumeTemplates';
import { ResumeData } from '../../types/resume';
import TemplateCustomizer from './TemplateCustomizer';

interface EnhancedTemplateBrowserProps {
  show: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: number, customSettings?: TemplateCustomSettings) => void;
  currentTemplateId?: number;
  resumeData: ResumeData;
}

export interface TemplateCustomSettings {
  colorScheme: string;
  fontFamily: string;
  spacing: 'compact' | 'normal' | 'spacious';
  showPhoto: boolean;
}

const defaultCustomSettings: TemplateCustomSettings = {
  colorScheme: 'default',
  fontFamily: 'inter',
  spacing: 'normal',
  showPhoto: true
};

const EnhancedTemplateBrowser: React.FC<EnhancedTemplateBrowserProps> = ({
  show,
  onClose,
  onSelectTemplate,
  currentTemplateId = 1,
  resumeData
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);
  const [customSettings, setCustomSettings] = useState<TemplateCustomSettings>(defaultCustomSettings);
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'browse' | 'customize'>('browse');

  const categories = ['All', 'Modern', 'Professional', 'Creative'];

  // Filter templates based on category and search query
  const filteredTemplates = templates
    .filter(template => 
      selectedCategory === 'All' || template.category === selectedCategory
    )
    .filter(template => 
      searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              {currentView === 'customize' && (
                <button 
                  onClick={() => setCurrentView('browse')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <h2 className="text-xl font-bold">
                {currentView === 'browse' ? 'Choose a Template' : 'Customize Template'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {currentView === 'browse' ? (
            <>
              {/* Search and Filters */}
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECCA3]"
                    />
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-[#4ECCA3] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                        currentTemplateId === template.id ? 'ring-2 ring-[#4ECCA3]' : ''
                      }`}
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        {template.image ? (
                          <img
                            src={template.image}
                            alt={template.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div 
                            className="h-full w-full flex items-center justify-center" 
                            style={{ backgroundColor: template.id % 2 === 0 ? '#f3f4f6' : '#e5e7eb' }}
                          >
                            <span className="text-gray-400 text-lg font-bold">{template.name}</span>
                          </div>
                        )}
                        {template.popular && (
                          <div className="absolute top-4 right-4 bg-[#4ECCA3] text-white text-xs px-3 py-1 rounded-full">
                            Popular
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          {currentTemplateId === template.id && (
                            <Check className="h-5 w-5 text-[#4ECCA3]" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => setPreviewTemplate(template)}
                            className="flex items-center gap-2 text-[#4ECCA3] hover:text-[#45B08C] transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                onSelectTemplate(template.id, customSettings);
                                onClose();
                              }}
                              className="flex items-center gap-2 bg-[#4ECCA3] text-white px-3 py-1.5 rounded-lg hover:bg-[#45B08C] transition-all text-sm"
                            >
                              <Check className="w-4 h-4" />
                              Select
                            </button>
                            <button 
                              onClick={() => {
                                setCurrentView('customize');
                                onSelectTemplate(template.id, customSettings);
                              }}
                              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all text-sm"
                            >
                              <SlidersHorizontal className="w-4 h-4" />
                              Customize
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <TemplateCustomizer
              templateId={currentTemplateId}
              resumeData={resumeData}
              initialSettings={customSettings}
              onChange={setCustomSettings}
              onSave={(settings) => {
                onSelectTemplate(currentTemplateId, settings);
                onClose();
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Template Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setPreviewTemplate(null)}
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
                <previewTemplate.component resume={resumeData} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default EnhancedTemplateBrowser;
