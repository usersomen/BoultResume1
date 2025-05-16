import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { templates } from '../templates/ResumeTemplates';
import { ResumeData } from '../../types/resume';
import { TemplateCustomSettings } from './EnhancedTemplateBrowser';

interface TemplateCustomizerProps {
  templateId: number;
  resumeData: ResumeData;
  initialSettings: TemplateCustomSettings;
  onChange: (settings: TemplateCustomSettings) => void;
  onSave: (settings: TemplateCustomSettings) => void;
}

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface FontOption {
  id: string;
  name: string;
  family: string;
}

const colorSchemes: ColorScheme[] = [
  { 
    id: 'default', 
    name: 'Default', 
    primary: '#4ECCA3', 
    secondary: '#232931', 
    accent: '#393E46' 
  },
  { 
    id: 'blue', 
    name: 'Professional Blue', 
    primary: '#1E88E5', 
    secondary: '#0D47A1', 
    accent: '#E3F2FD' 
  },
  { 
    id: 'charcoal', 
    name: 'Elegant Charcoal', 
    primary: '#37474F', 
    secondary: '#263238', 
    accent: '#CFD8DC' 
  },
  { 
    id: 'crimson', 
    name: 'Bold Crimson', 
    primary: '#D32F2F', 
    secondary: '#B71C1C', 
    accent: '#FFCDD2' 
  },
  { 
    id: 'purple', 
    name: 'Creative Purple', 
    primary: '#7B1FA2', 
    secondary: '#4A148C', 
    accent: '#E1BEE7' 
  },
  { 
    id: 'teal', 
    name: 'Modern Teal', 
    primary: '#00897B', 
    secondary: '#004D40', 
    accent: '#B2DFDB' 
  },
  { 
    id: 'amber', 
    name: 'Warm Amber', 
    primary: '#FFB300', 
    secondary: '#FF8F00', 
    accent: '#FFECB3' 
  },
  { 
    id: 'gray', 
    name: 'Minimalist Gray', 
    primary: '#616161', 
    secondary: '#424242', 
    accent: '#EEEEEE' 
  },
];

const fontOptions: FontOption[] = [
  { id: 'inter', name: 'Inter (Modern)', family: 'Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto (Clean)', family: 'Roboto, sans-serif' },
  { id: 'poppins', name: 'Poppins (Contemporary)', family: 'Poppins, sans-serif' },
  { id: 'playfair', name: 'Playfair Display (Elegant)', family: 'Playfair Display, serif' },
  { id: 'opensans', name: 'Open Sans (Professional)', family: 'Open Sans, sans-serif' },
  { id: 'merriweather', name: 'Merriweather (Traditional)', family: 'Merriweather, serif' },
  { id: 'montserrat', name: 'Montserrat (Modern Sans)', family: 'Montserrat, sans-serif' },
  { id: 'lato', name: 'Lato (Balanced)', family: 'Lato, sans-serif' },
];

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  templateId,
  resumeData,
  initialSettings,
  onChange,
  onSave
}) => {
  const [settings, setSettings] = useState<TemplateCustomSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout'>('colors');
  
  const selectedTemplate = templates.find(t => t.id === templateId) || templates[0];

  useEffect(() => {
    onChange(settings);
  }, [settings, onChange]);

  const handleColorSchemeChange = (schemeId: string) => {
    setSettings({
      ...settings,
      colorScheme: schemeId
    });
  };

  const handleFontChange = (fontId: string) => {
    setSettings({
      ...settings,
      fontFamily: fontId
    });
  };

  const handleSpacingChange = (spacing: 'compact' | 'normal' | 'spacious') => {
    setSettings({
      ...settings,
      spacing
    });
  };

  const handleShowPhotoChange = (showPhoto: boolean) => {
    setSettings({
      ...settings,
      showPhoto
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left Side: Customization Options */}
      <div className="w-full md:w-1/3 border-r overflow-y-auto p-6">
        <h3 className="font-semibold text-lg mb-4">Customize Your Template</h3>
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('colors')}
            className={`pb-2 px-4 font-medium text-sm ${activeTab === 'colors' ? 'border-b-2 border-[#4ECCA3] text-[#4ECCA3]' : 'text-gray-500'}`}
          >
            Colors
          </button>
          <button
            onClick={() => setActiveTab('fonts')}
            className={`pb-2 px-4 font-medium text-sm ${activeTab === 'fonts' ? 'border-b-2 border-[#4ECCA3] text-[#4ECCA3]' : 'text-gray-500'}`}
          >
            Fonts
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`pb-2 px-4 font-medium text-sm ${activeTab === 'layout' ? 'border-b-2 border-[#4ECCA3] text-[#4ECCA3]' : 'text-gray-500'}`}
          >
            Layout
          </button>
        </div>
        
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h4 className="font-medium text-sm text-gray-500 mb-2">Color Scheme</h4>
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => handleColorSchemeChange(scheme.id)}
                  className={`
                    p-3 rounded-lg border transition-all flex flex-col items-start
                    ${settings.colorScheme === scheme.id ? 'ring-2 ring-[#4ECCA3] border-transparent' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="flex items-center w-full mb-2">
                    <span className="text-sm font-medium">{scheme.name}</span>
                    {settings.colorScheme === scheme.id && (
                      <Check className="ml-auto h-4 w-4 text-[#4ECCA3]" />
                    )}
                  </div>
                  <div className="flex w-full gap-1">
                    <div className="h-6 w-full rounded" style={{ backgroundColor: scheme.primary }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: scheme.secondary }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: scheme.accent }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Fonts Tab */}
        {activeTab === 'fonts' && (
          <div className="space-y-6">
            <h4 className="font-medium text-sm text-gray-500 mb-2">Font Family</h4>
            <div className="space-y-2">
              {fontOptions.map((font) => (
                <button
                  key={font.id}
                  onClick={() => handleFontChange(font.id)}
                  className={`
                    p-3 rounded-lg border w-full text-left transition-all flex items-center
                    ${settings.fontFamily === font.id ? 'ring-2 ring-[#4ECCA3] border-transparent' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ fontFamily: font.family }}>
                      {font.name}
                    </div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: font.family }}>
                      AaBbCcDdEeFf 123
                    </div>
                  </div>
                  {settings.fontFamily === font.id && (
                    <Check className="ml-auto h-4 w-4 text-[#4ECCA3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2">Spacing</h4>
              <div className="flex gap-2">
                {(['compact', 'normal', 'spacious'] as const).map((spacing) => (
                  <button
                    key={spacing}
                    onClick={() => handleSpacingChange(spacing)}
                    className={`
                      px-4 py-2 rounded-lg border text-sm font-medium
                      ${settings.spacing === spacing ? 'bg-[#4ECCA3] text-white border-transparent' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    {spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-2">Photo Display</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShowPhotoChange(true)}
                  className={`
                    px-4 py-2 rounded-lg border text-sm font-medium
                    ${settings.showPhoto ? 'bg-[#4ECCA3] text-white border-transparent' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  Show Photo
                </button>
                <button
                  onClick={() => handleShowPhotoChange(false)}
                  className={`
                    px-4 py-2 rounded-lg border text-sm font-medium
                    ${!settings.showPhoto ? 'bg-[#4ECCA3] text-white border-transparent' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  Hide Photo
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-6 mt-auto">
          <button
            onClick={() => onSave(settings)}
            className="w-full py-2.5 bg-[#4ECCA3] hover:bg-[#45B08C] text-white rounded-lg font-medium transition-colors"
          >
            Apply Changes & Select Template
          </button>
        </div>
      </div>
      
      {/* Right Side: Live Preview */}
      <div className="w-full md:w-2/3 bg-gray-50 overflow-y-auto p-6 flex flex-col items-center">
        <div className="mb-4 text-center">
          <h3 className="font-medium text-gray-700">Preview with custom settings</h3>
          <p className="text-sm text-gray-500">See how your resume will look with the selected customizations</p>
        </div>
        
        <div
          className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden transition-all transform scale-75 origin-top"
          style={{
            fontFamily: fontOptions.find(f => f.id === settings.fontFamily)?.family
          }}
        >
          {/* This would be the actual template preview with applied settings */}
          <div className="p-6">
            <selectedTemplate.component 
              resume={resumeData}
              // In a real implementation, we would pass the custom settings to the template component
              // customSettings={settings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;
