import React, { useRef } from 'react';
import { ModernProfileTemplate } from './templates/ModernProfileTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { StartupTemplate } from './templates/StartupTemplate';
import { CreativeOrangeTemplate } from './templates/CreativeOrangeTemplate';
import { CreativeSidebarTemplate } from './templates/CreativeSidebarTemplate';
import { ElegantSerifTemplate } from './templates/ElegantSerifTemplate';
import { ModernGradientTemplate } from './templates/ModernGradientTemplate';
import { ProfessionalDarkTemplate } from './templates/ProfessionalDarkTemplate';
import { TechMinimalTemplate } from './templates/TechMinimalTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ModernClassicTemplate } from './templates/ModernClassicTemplate';
import { generatePreviewImage } from '../utils/generatePreviewImage';
import { sampleResumes } from '../data/sampleResumes';

type TemplateId = keyof typeof sampleResumes;

interface Props {
  templateId: TemplateId;
}

export default function PreviewGenerator({ templateId }: Props) {
  const templateRef = useRef<HTMLDivElement>(null);

  const handleGeneratePreview = async () => {
    if (templateRef.current) {
      try {
        await generatePreviewImage(templateId, templateRef.current);
      } catch (error) {
        console.error('Failed to generate preview:', error);
      }
    }
  };

  const getTemplateComponent = () => {
    const sampleData = sampleResumes[templateId] || sampleResumes.modernProfile;

    switch (templateId) {
      case 'executive':
        return <ExecutiveTemplate resume={sampleData} />;
      case 'startup':
        return <StartupTemplate resume={sampleData} />;
      case 'modernProfile':
        return <ModernProfileTemplate resume={sampleData} />;
      default:
        return <ModernProfileTemplate resume={sampleData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Preview Generator
          </h1>
          <button
            onClick={handleGeneratePreview}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
          >
            Generate Preview
          </button>
        </div>

        <div ref={templateRef}>
          {getTemplateComponent()}
        </div>
      </div>
    </div>
  );
} 