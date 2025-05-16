import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, FileText, Mail, Copy, Share, File, 
  Printer, Settings, Check, Link, Image
} from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ExportOptionsProps {
  show: boolean;
  onClose: () => void;
  onExport: (format: string, settings?: any) => void;
  resumeData: ResumeData;
}

interface ExportFormat {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium?: boolean;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'pdf',
    name: 'PDF Document',
    icon: <FileText className="h-5 w-5" />,
    description: 'Best for submitting to job applications'
  },
  {
    id: 'docx',
    name: 'Word Document',
    icon: <File className="h-5 w-5" />,
    description: 'Editable format for Microsoft Word'
  },
  {
    id: 'txt',
    name: 'Plain Text',
    icon: <FileText className="h-5 w-5" />,
    description: 'For easy copy-pasting to forms'
  },
  {
    id: 'print',
    name: 'Print',
    icon: <Printer className="h-5 w-5" />,
    description: 'Print physical copies'
  },
  {
    id: 'clipboard',
    name: 'Copy to Clipboard',
    icon: <Copy className="h-5 w-5" />,
    description: 'Quickly paste in applications'
  },
  {
    id: 'link',
    name: 'Shareable Link',
    icon: <Link className="h-5 w-5" />,
    description: 'Create a web link to your resume',
    isPremium: true
  },
  {
    id: 'image',
    name: 'Image (PNG/JPG)',
    icon: <Image className="h-5 w-5" />,
    description: 'Export as image file',
    isPremium: true
  },
  {
    id: 'email',
    name: 'Send via Email',
    icon: <Mail className="h-5 w-5" />,
    description: 'Email your resume directly',
    isPremium: true
  }
];

const ExportOptions: React.FC<ExportOptionsProps> = ({
  show,
  onClose,
  onExport,
  resumeData
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportComplete, setExportComplete] = useState<boolean>(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  
  // PDF Export Settings
  const [pdfSettings, setPdfSettings] = useState({
    paperSize: 'a4',
    orientation: 'portrait',
    margins: 'normal',
    includeCoverLetter: false,
    optimizeForATS: true
  });

  const handleExport = () => {
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setExportComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
    
    // Call the actual export function
    onExport(selectedFormat, selectedFormat === 'pdf' ? pdfSettings : undefined);
  };

  const resetExport = () => {
    setExportProgress(null);
    setExportComplete(false);
  };

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
          className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Download className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">Export Resume</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {exportProgress !== null ? (
              <div className="text-center py-8">
                {!exportComplete ? (
                  <>
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-[#4ECCA3]"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${2.64 * 42 * (exportProgress / 100)} ${2.64 * 42}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                        {exportProgress}%
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Preparing Your Resume</h3>
                    <p className="text-gray-600">
                      {`Exporting as ${exportFormats.find(f => f.id === selectedFormat)?.name}...`}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto mb-6 bg-[#4ECCA3]/10 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 text-[#4ECCA3]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Export Complete!</h3>
                    <p className="text-gray-600 mb-6">
                      Your resume has been successfully exported.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={resetExport}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Export Another Format
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C]"
                      >
                        Done
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Choose Export Format</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exportFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setSelectedFormat(format.id)}
                        className={`p-4 rounded-lg border text-left transition-all flex items-start
                          ${selectedFormat === format.id 
                            ? 'ring-2 ring-[#4ECCA3] border-transparent' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          ${format.isPremium ? 'opacity-70' : ''}
                        `}
                        disabled={format.isPremium}
                      >
                        <div className={`p-2 rounded-lg mr-3 ${
                          selectedFormat === format.id ? 'bg-[#4ECCA3]/10 text-[#4ECCA3]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {format.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{format.name}</span>
                            {format.isPremium && (
                              <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedFormat === 'pdf' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">PDF Export Settings</h3>
                      <button
                        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                        className="text-[#4ECCA3] hover:text-[#45B08C] text-sm font-medium flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
                        <div className="flex space-x-3">
                          {['a4', 'letter', 'legal'].map((size) => (
                            <button
                              key={size}
                              onClick={() => setPdfSettings({...pdfSettings, paperSize: size})}
                              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                pdfSettings.paperSize === size 
                                  ? 'bg-[#4ECCA3] text-white border-transparent' 
                                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {size.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                        <div className="flex space-x-3">
                          {['portrait', 'landscape'].map((orientation) => (
                            <button
                              key={orientation}
                              onClick={() => setPdfSettings({...pdfSettings, orientation})}
                              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                pdfSettings.orientation === orientation 
                                  ? 'bg-[#4ECCA3] text-white border-transparent' 
                                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {showAdvancedSettings && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Margins</label>
                            <div className="flex space-x-3">
                              {['narrow', 'normal', 'wide'].map((margin) => (
                                <button
                                  key={margin}
                                  onClick={() => setPdfSettings({...pdfSettings, margins: margin})}
                                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                    pdfSettings.margins === margin 
                                      ? 'bg-[#4ECCA3] text-white border-transparent' 
                                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {margin.charAt(0).toUpperCase() + margin.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={pdfSettings.optimizeForATS}
                                onChange={(e) => setPdfSettings({...pdfSettings, optimizeForATS: e.target.checked})}
                                className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                              />
                              <span className="ml-2 text-sm text-gray-700">Optimize for ATS compatibility</span>
                            </label>
                          </div>

                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={pdfSettings.includeCoverLetter}
                                onChange={(e) => setPdfSettings({...pdfSettings, includeCoverLetter: e.target.checked})}
                                className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                              />
                              <span className="ml-2 text-sm text-gray-700">Include cover letter (if available)</span>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <div className="p-1.5 bg-[#4ECCA3]/10 rounded-full text-[#4ECCA3] mr-3">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {selectedFormat === 'pdf' ? (
                          "Your PDF resume will be properly formatted for both digital viewing and printing."
                        ) : selectedFormat === 'docx' ? (
                          "Word documents allow you to make further edits if necessary."
                        ) : selectedFormat === 'txt' ? (
                          "Plain text is perfect for copying and pasting into online applications."
                        ) : selectedFormat === 'print' ? (
                          "Print your resume directly with optimized settings for paper output."
                        ) : selectedFormat === 'clipboard' ? (
                          "Copy your resume to clipboard for quick pasting into applications."
                        ) : (
                          "Export your resume to use in your job applications."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {exportProgress === null && (
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={handleExport}
                className="px-6 py-2.5 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C] transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export {exportFormats.find(f => f.id === selectedFormat)?.name}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExportOptions;
