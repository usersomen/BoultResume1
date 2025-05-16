import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { templates } from '../../components/templates/ResumeTemplates';

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const template = templates.find(t => t.id === parseInt(id || '0'));

  useEffect(() => {
    // Add a class to the body for styling
    document.body.classList.add('preview-mode');
    return () => {
      document.body.classList.remove('preview-mode');
    };
  }, []);

  if (!template) {
    return <div>Template not found</div>;
  }

  const TemplateComponent = template.component;

  return (
    <div className="resume-template">
      <TemplateComponent resume={template.sampleData} />
    </div>
  );
} 