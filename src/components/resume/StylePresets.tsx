import React, { useState, useEffect } from 'react';
import { Save, Trash2, Check, X, AlertCircle, Type, Maximize, MoveVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StylePreset {
  id: string;
  name: string;
  template: string;
  font: string;
  color: string;
  fontScale?: number;
  lineSpacing?: number;
  sectionSpacing?: number;
  fontSize?: string;
  contentDensity?: string;
  sectionSpacingSize?: string;
  dateCreated: string;
}

interface StylePresetsProps {
  show: boolean;
  onClose: () => void;
  onApplyPreset: (preset: StylePreset) => void;
  onSaveCurrentStyle: (name: string) => void;
  onDeletePreset: (id: string) => void;
  presets: StylePreset[];
  currentStyle: {
    template: string;
    font: string;
    color: string;
    fontSize?: string;
    contentDensity?: string;
    sectionSpacingSize?: string;
    fontScale?: number;
    lineSpacing?: number;
    sectionSpacing?: number;
  };
}

const StylePresets: React.FC<StylePresetsProps> = ({
  show,
  onClose,
  onApplyPreset,
  onSaveCurrentStyle,
  onDeletePreset,
  presets,
  currentStyle
}) => {
  const [newPresetName, setNewPresetName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSavePreset = () => {
    if (!newPresetName.trim()) {
      setError('Please enter a name for your preset');
      return;
    }
    
    // Check for duplicate names
    if (presets.some(preset => preset.name.toLowerCase() === newPresetName.toLowerCase())) {
      setError('A preset with this name already exists');
      return;
    }
    
    onSaveCurrentStyle(newPresetName);
    setNewPresetName('');
    setShowSaveForm(false);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
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
          className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center">
              <Save className="h-5 w-5 text-gray-700 mr-2" />
              <h2 className="text-xl font-bold">Style Presets</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {/* Save current style form */}
            {showSaveForm ? (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium mb-3">Save Current Style</h3>
                <div className="mb-3">
                  <label htmlFor="presetName" className="block text-sm font-medium text-gray-700 mb-1">
                    Preset Name
                  </label>
                  <input
                    type="text"
                    id="presetName"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="e.g., Professional Blue"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSavePreset}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm flex items-center"
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Save Preset
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveForm(false);
                      setError(null);
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowSaveForm(true)}
                className="mb-6 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full flex items-center justify-center text-gray-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Current Style as Preset
              </button>
            )}

            {/* Saved presets */}
            {presets.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700 mb-2">Saved Presets</h3>
                {presets.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{preset.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {preset.template} template • {preset.font.split(',')[0]} • Created {formatDate(preset.dateCreated)}
                        </p>
                        {(preset.fontSize || preset.contentDensity || preset.sectionSpacingSize) && (
                          <div className="flex mt-2 text-xs text-gray-500 space-x-3">
                            {preset.fontSize && (
                              <span className="flex items-center">
                                <Type className="h-3 w-3 mr-1" />
                                {preset.fontSize.charAt(0).toUpperCase() + preset.fontSize.slice(1)} text
                              </span>
                            )}
                            {preset.contentDensity && (
                              <span className="flex items-center">
                                <MoveVertical className="h-3 w-3 mr-1" />
                                {preset.contentDensity.charAt(0).toUpperCase() + preset.contentDensity.slice(1)} density
                              </span>
                            )}
                            {preset.sectionSpacingSize && (
                              <span className="flex items-center">
                                <Maximize className="h-3 w-3 mr-1" />
                                {preset.sectionSpacingSize.charAt(0).toUpperCase() + preset.sectionSpacingSize.slice(1)} spacing
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => onApplyPreset(preset)}
                          className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          title="Apply preset"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeletePreset(preset.id)}
                          className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          title="Delete preset"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Preview */}
                    <div className="mt-3 flex items-center space-x-3">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: preset.color }}
                      ></div>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            backgroundColor: preset.color,
                            width: '60%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>You haven't saved any style presets yet.</p>
                <p className="text-sm mt-1">Save your current style to quickly apply it later.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StylePresets;
