import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, X } from 'lucide-react';
import { CreativeOrangeTemplate } from './CreativeOrangeTemplate';
import { CreativeSidebarTemplate } from './CreativeSidebarTemplate';
import { ElegantSerifTemplate } from './ElegantSerifTemplate';
import { ModernGradientTemplate } from './ModernGradientTemplate';
import { ProfessionalDarkTemplate } from './ProfessionalDarkTemplate';
import { TechMinimalTemplate } from './TechMinimalTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { StartupTemplate } from './StartupTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { CompactTemplate } from './CompactTemplate';
import { ModernClassicTemplate } from './ModernClassicTemplate';
import { ModernProfileTemplate } from './ModernProfileTemplate';
import { sampleResumes } from '../../data/sampleResumes';

// Use a placeholder image URL for all templates
const placeholderImage = 'https://via.placeholder.com/600x800?text=Resume+Template';

export const templates = [
  {
    id: 1,
    name: 'Creative Orange',
    category: 'Creative',
    image: placeholderImage,
    popular: true,
    component: CreativeOrangeTemplate,
    sampleData: sampleResumes.startup,
    description: 'Modern design with vibrant orange accents and creative layout'
  },
  {
    id: 2,
    name: 'Creative Sidebar',
    category: 'Creative',
    image: placeholderImage,
    popular: true,
    component: CreativeSidebarTemplate,
    sampleData: sampleResumes.modernProfile,
    description: 'Unique sidebar design with modern typography and layout'
  },
  {
    id: 3,
    name: 'Elegant Serif',
    category: 'Professional',
    image: placeholderImage,
    popular: false,
    component: ElegantSerifTemplate,
    sampleData: sampleResumes.executive,
    description: 'Classic design with elegant serif fonts and traditional layout'
  },
  {
    id: 4,
    name: 'Modern Gradient',
    category: 'Modern',
    image: placeholderImage,
    popular: true,
    component: ModernGradientTemplate,
    sampleData: sampleResumes.modernProfile,
    description: 'Contemporary design featuring smooth gradient transitions'
  },
  {
    id: 5,
    name: 'Professional Dark',
    category: 'Professional',
    image: placeholderImage,
    popular: false,
    component: ProfessionalDarkTemplate,
    sampleData: sampleResumes.executive,
    description: 'Sophisticated dark theme for a strong professional impact'
  },
  {
    id: 6,
    name: 'Tech Minimal',
    category: 'Modern',
    image: placeholderImage,
    popular: true,
    component: TechMinimalTemplate,
    sampleData: sampleResumes.startup,
    description: 'Clean, minimalist design perfect for tech professionals'
  },
  {
    id: 7,
    name: 'Minimalist',
    category: 'Modern',
    image: placeholderImage,
    popular: false,
    component: MinimalistTemplate,
    sampleData: sampleResumes.modernProfile,
    description: 'Simple and clean design focusing on essential information'
  },
  {
    id: 8,
    name: 'Startup',
    category: 'Creative',
    image: placeholderImage,
    popular: false,
    component: StartupTemplate,
    sampleData: sampleResumes.startup,
    description: 'Dynamic layout ideal for startup and innovation roles'
  },
  {
    id: 9,
    name: 'Executive',
    category: 'Professional',
    image: placeholderImage,
    popular: true,
    component: ExecutiveTemplate,
    sampleData: sampleResumes.executive,
    description: 'Premium design for senior executives and leadership roles'
  },
  {
    id: 10,
    name: 'Compact',
    category: 'Professional',
    image: placeholderImage,
    popular: false,
    component: CompactTemplate,
    sampleData: sampleResumes.modernProfile,
    description: 'Space-efficient design without compromising on style'
  },
  {
    id: 11,
    name: 'Modern Classic',
    category: 'Modern',
    image: placeholderImage,
    popular: false,
    component: ModernClassicTemplate,
    sampleData: sampleResumes.executive,
    description: 'Contemporary take on traditional resume design'
  },
  {
    id: 12,
    name: 'Modern Profile',
    category: 'Professional',
    image: placeholderImage,
    popular: true,
    component: ModernProfileTemplate,
    sampleData: sampleResumes.modernProfile,
    description: 'Clean and professional design with profile photo and modern layout'
  }
];

export default function ResumeTemplates() {
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Modern', 'Professional', 'Creative'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex items-center justify-center gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Templates Grid */}
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
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all">
                  <Download className="w-4 h-4" />
                  Use
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
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
                <previewTemplate.component resume={previewTemplate.sampleData} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}