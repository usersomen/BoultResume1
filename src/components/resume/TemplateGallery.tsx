import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateGalleryProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onClose: () => void;
}

interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  recommendedFor: string[];
  preview: string; // path to the preview image
}

const templates: TemplateInfo[] = [
  // Modern templates
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern',
    description: 'Clean and professional with a colored header',
    recommendedFor: ['Corporate', 'Business', 'Technology'],
    preview: '/templates/modern.png'
  },
  {
    id: 'modernGradient',
    name: 'Modern Gradient',
    category: 'Modern',
    description: 'Modern design with a gradient header',
    recommendedFor: ['Marketing', 'Design', 'Creative Technology'],
    preview: '/templates/modernGradient.png'
  },
  {
    id: 'modernProfile',
    name: 'Modern Profile',
    category: 'Modern',
    description: 'Modern layout with prominent profile photo',
    recommendedFor: ['Sales', 'Real Estate', 'Consulting'],
    preview: '/templates/modernProfile.png'
  },
  
  // Professional templates
  {
    id: 'professional',
    name: 'Professional',
    category: 'Professional',
    description: 'Traditional layout with subtle accents',
    recommendedFor: ['Finance', 'Law', 'Executive'],
    preview: '/templates/professional.png'
  },
  {
    id: 'professionalDark',
    name: 'Professional Dark',
    category: 'Professional',
    description: 'Sophisticated dark theme for a bold impression',
    recommendedFor: ['Creative', 'Design', 'Technology'],
    preview: '/templates/professionalDark.png'
  },
  
  // Minimalist templates
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Minimalist',
    description: 'Clean, simple design with focus on content',
    recommendedFor: ['Academia', 'Research', 'Engineering'],
    preview: '/templates/minimalist.png'
  },
  {
    id: 'minimalistClean',
    name: 'Minimalist Clean',
    category: 'Minimalist',
    description: 'Ultra-clean design with perfect spacing',
    recommendedFor: ['UX/UI Design', 'Architecture', 'Product Management'],
    preview: '/templates/minimalistClean.png'
  },
  
  // Creative templates
  {
    id: 'creativeSidebar',
    name: 'Creative Sidebar',
    category: 'Creative',
    description: 'Bold sidebar design with colored accent',
    recommendedFor: ['Design', 'Marketing', 'Media'],
    preview: '/templates/creativeSidebar.png'
  },
  {
    id: 'creativeViolet',
    name: 'Creative Violet',
    category: 'Creative',
    description: 'Vibrant design with purple accents',
    recommendedFor: ['Creative Arts', 'Entertainment', 'Digital Media'],
    preview: '/templates/creativeViolet.png'
  },
  {
    id: 'creativeOrange',
    name: 'Creative Orange',
    category: 'Creative',
    description: 'Energetic design with orange accents',
    recommendedFor: ['Marketing', 'Advertising', 'Hospitality'],
    preview: '/templates/creativeOrange.png'
  },
  
  // Elegant templates
  {
    id: 'elegantSerif',
    name: 'Elegant Serif',
    category: 'Elegant',
    description: 'Sophisticated design with serif typography',
    recommendedFor: ['Academia', 'Publishing', 'Traditional Industries'],
    preview: '/templates/elegantSerif.png'
  },
  {
    id: 'elegantMinimal',
    name: 'Elegant Minimal',
    category: 'Elegant',
    description: 'Refined minimal design with serif accents',
    recommendedFor: ['Executive', 'Consulting', 'Legal'],
    preview: '/templates/elegantMinimal.png'
  },
  
  // Startup template
  {
    id: 'startup',
    name: 'Startup',
    category: 'Modern',
    description: 'Contemporary design with tag-style headings',
    recommendedFor: ['Startups', 'Tech', 'Digital Marketing'],
    preview: '/templates/startup.png'
  }
];

// Group templates by category
const getTemplatesByCategory = () => {
  const categories: { [key: string]: TemplateInfo[] } = {};
  
  templates.forEach(template => {
    if (!categories[template.category]) {
      categories[template.category] = [];
    }
    categories[template.category].push(template);
  });
  
  return categories;
};

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ 
  selectedTemplate, 
  onSelectTemplate, 
  onClose 
}) => {
  const templatesByCategory = getTemplatesByCategory();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Template Gallery</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-grow">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium mb-3">{category} Templates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categoryTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? 'ring-2 ring-blue-500 shadow-md' : ''
                    }`}
                    onClick={() => onSelectTemplate(template.id)}
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {template.preview ? (
                        <img 
                          src={template.preview} 
                          alt={template.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Template+Preview';
                          }}
                        />
                      ) : (
                        <div className="text-gray-400">Preview not available</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Recommended for:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.recommendedFor.map((industry, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Apply Template
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TemplateGallery;
