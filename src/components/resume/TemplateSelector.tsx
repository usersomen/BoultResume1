import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateSelectorProps {
  show: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  currentTemplate: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

const templates: Template[] = [
  {
    id: 'default',
    name: 'Professional',
    description: 'Classic design with a clean and professional look',
    thumbnail: '/templates/professional.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with bold section headers',
    thumbnail: '/templates/modern.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design with subtle styling',
    thumbnail: '/templates/minimal.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique design for creative professionals',
    thumbnail: '/templates/creative.png'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated layout for senior positions',
    thumbnail: '/templates/executive.png'
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  show, 
  onClose, 
  onSelectTemplate,
  currentTemplate 
}) => {
  if (!show) return null;

  // Placeholder image for thumbnails if real images aren't available
  const placeholderImage = (templateId: string) => {
    const colors: Record<string, string> = {
      default: '#4ECCA3',
      modern: '#FF6B6B',
      minimal: '#4D96FF',
      creative: '#FFD93D',
      executive: '#6D67E4'
    };
    
    return (
      <div 
        className="h-40 w-full rounded-t-lg flex items-center justify-center" 
        style={{ backgroundColor: colors[templateId] || '#4ECCA3' }}
      >
        <span className="text-white text-lg font-bold">{templateId.charAt(0).toUpperCase() + templateId.slice(1)}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Choose a Template</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div 
                key={template.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  currentTemplate === template.id ? 'ring-2 ring-[#4ECCA3]' : ''
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                {template.thumbnail ? (
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="h-40 w-full object-cover rounded-t-lg"
                  />
                ) : (
                  placeholderImage(template.id)
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    {currentTemplate === template.id && (
                      <Check className="h-5 w-5 text-[#4ECCA3]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4ECCA3] text-white rounded hover:bg-[#45B08C] transition-colors"
          >
            Apply Template
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplateSelector;
