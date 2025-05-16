import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Download, Copy, Trash2, Check, X, Info, Edit, Calendar, User } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ResumeVersion {
  id: string;
  name: string;
  description: string;
  date: string;
  resumeData: ResumeData;
  templateId: number;
  templateSettings?: any;
}

interface ResumeVersionControlProps {
  show: boolean;
  onClose: () => void;
  currentResumeData: ResumeData;
  currentTemplateId: number;
  templateSettings?: any;
  onLoadVersion: (version: ResumeVersion) => void;
}

// Mock data - this would be stored in a database in a real application
const mockVersions: ResumeVersion[] = [
  {
    id: '1',
    name: 'Software Engineer - Tech Companies',
    description: 'Tailored for software engineering roles at major tech companies',
    date: '2025-02-20',
    resumeData: {} as ResumeData, // This would be actual resume data
    templateId: 1
  },
  {
    id: '2',
    name: 'Product Manager - Startups',
    description: 'Emphasizes product management experience for startup applications',
    date: '2025-02-15',
    resumeData: {} as ResumeData,
    templateId: 2
  },
  {
    id: '3',
    name: 'Data Scientist - Finance',
    description: 'Focuses on data analysis skills for finance industry roles',
    date: '2025-02-10',
    resumeData: {} as ResumeData,
    templateId: 3
  }
];

const ResumeVersionControl: React.FC<ResumeVersionControlProps> = ({
  show,
  onClose,
  currentResumeData,
  currentTemplateId,
  templateSettings,
  onLoadVersion
}) => {
  const [versions, setVersions] = useState<ResumeVersion[]>(mockVersions);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [newVersionName, setNewVersionName] = useState<string>('');
  const [newVersionDescription, setNewVersionDescription] = useState<string>('');
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  const handleSaveNewVersion = () => {
    if (!newVersionName.trim()) return;

    const newVersion: ResumeVersion = {
      id: Date.now().toString(),
      name: newVersionName,
      description: newVersionDescription,
      date: new Date().toISOString().split('T')[0],
      resumeData: currentResumeData,
      templateId: currentTemplateId,
      templateSettings
    };

    setVersions([newVersion, ...versions]);
    setNewVersionName('');
    setNewVersionDescription('');
    setShowSaveDialog(false);
  };

  const handleDeleteVersion = (id: string) => {
    setVersions(versions.filter(v => v.id !== id));
    setShowConfirmDelete(null);
  };

  const handleDuplicateVersion = (version: ResumeVersion) => {
    const duplicatedVersion: ResumeVersion = {
      ...version,
      id: Date.now().toString(),
      name: `${version.name} (Copy)`,
      date: new Date().toISOString().split('T')[0]
    };

    setVersions([duplicatedVersion, ...versions]);
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
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">Resume Versions</h2>
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
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Save different versions of your resume for different job applications or industries.
              </p>
              <button
                onClick={() => setShowSaveDialog(true)}
                className="px-4 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C] transition-colors"
              >
                Save Current Version
              </button>
            </div>

            {versions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Saved Versions</h3>
                <p className="text-gray-500">
                  Click "Save Current Version" to create your first saved resume version.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {versions.map((version) => (
                  <div 
                    key={version.id}
                    className={`border rounded-lg p-4 transition-all ${
                      selectedVersion === version.id 
                        ? 'border-[#4ECCA3] bg-[#4ECCA3]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedVersion(selectedVersion === version.id ? null : version.id)}
                      >
                        <div className="flex items-center">
                          <h3 className="font-medium">{version.name}</h3>
                          {selectedVersion === version.id && (
                            <Check className="ml-2 h-4 w-4 text-[#4ECCA3]" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{version.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Saved on {version.date}</span>
                          <User className="h-3.5 w-3.5 ml-3 mr-1" />
                          <span>Template: {templates.find(t => t.id === version.templateId)?.name || 'Unknown'}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => onLoadVersion(version)}
                          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Load this version"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateVersion(version)}
                          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Duplicate version"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowConfirmDelete(version.id)}
                          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500 transition-colors"
                          title="Delete version"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Version comparison/details would go here when expanded */}
                    {selectedVersion === version.id && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-sm mb-2">Resume Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Job Title</p>
                            <p>{version.resumeData?.personalInfo?.title || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Skills</p>
                            <p>{version.resumeData?.skills?.length || 0} skills listed</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Experience</p>
                            <p>{version.resumeData?.experience?.length || 0} positions</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Education</p>
                            <p>{version.resumeData?.education?.length || 0} entries</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Save New Version Dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Save Resume Version</h3>
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="version-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Version Name
                  </label>
                  <input
                    type="text"
                    id="version-name"
                    placeholder="E.g. Software Engineer - Big Tech"
                    value={newVersionName}
                    onChange={(e) => setNewVersionName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECCA3]"
                  />
                </div>

                <div>
                  <label htmlFor="version-desc" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="version-desc"
                    placeholder="What is this version for? What makes it unique?"
                    value={newVersionDescription}
                    onChange={(e) => setNewVersionDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECCA3] min-h-[80px]"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewVersion}
                  className="px-4 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C]"
                  disabled={!newVersionName.trim()}
                >
                  Save Version
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Dialog */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <h3 className="text-lg font-semibold mb-2">Delete Version?</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this resume version? This action cannot be undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteVersion(showConfirmDelete)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

// This is a placeholder for the actual templates list
const templates = [
  { id: 1, name: 'Modern Classic' },
  { id: 2, name: 'Creative Orange' },
  { id: 3, name: 'Minimal' },
  { id: 4, name: 'Executive' },
  { id: 5, name: 'Tech Minimal' },
];

export default ResumeVersionControl;
