import React, { useState, useEffect } from 'react';
import { Type, Maximize, Minimize, AlertCircle, Save, MoveVertical } from 'lucide-react';

interface TypographyControlsProps {
  fontScale: number;
  lineSpacing: number;
  sectionSpacing: number;
  onChangeFontScale: (scale: number) => void;
  onChangeLineSpacing: (spacing: number) => void;
  onChangeSectionSpacing: (spacing: number) => void;
  fontSize?: string;
  contentDensity?: string;
  sectionSpacingSize?: string;
  canSavePreset?: boolean;
  onSaveAsPreset?: () => void;
}

const TypographyControls: React.FC<TypographyControlsProps> = ({
  fontScale,
  lineSpacing,
  sectionSpacing,
  onChangeFontScale,
  onChangeLineSpacing,
  onChangeSectionSpacing,
  fontSize = 'medium',
  contentDensity = 'medium',
  sectionSpacingSize = 'medium',
  canSavePreset = false,
  onSaveAsPreset
}) => {
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [lastChanged, setLastChanged] = useState<string | null>(null);
  
  // Check for potential spacing issues and show warnings
  useEffect(() => {
    if (fontScale > 1.1 && sectionSpacing < 1.2) {
      setShowWarning('Large font with tight spacing may cause content to overlap');
    } else if (fontScale < 0.9 && sectionSpacing > 1.3) {
      setShowWarning('Small font with wide spacing may create too much whitespace');
    } else {
      setShowWarning(null);
    }
  }, [fontScale, sectionSpacing]);

  // Show feedback when settings change
  useEffect(() => {
    if (lastChanged) {
      const timer = setTimeout(() => {
        setLastChanged(null);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [lastChanged]);

  const handleFontSizeChange = (scale: number, size: string) => {
    onChangeFontScale(scale);
    setLastChanged('fontSize');
  };

  const handleContentDensityChange = (spacing: number) => {
    onChangeLineSpacing(spacing);
    setLastChanged('contentDensity');
  };

  const handleSectionSpacingChange = (spacing: number) => {
    onChangeSectionSpacing(spacing);
    setLastChanged('sectionSpacing');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-800 flex items-center">
          <Type className="h-4 w-4 mr-2" />
          Typography & Layout
        </h3>
        {canSavePreset && onSaveAsPreset && (
          <button 
            onClick={onSaveAsPreset}
            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center hover:bg-blue-100 transition-colors"
            title="Save current typography settings as a style preset"
          >
            <Save className="h-3 w-3 mr-1" />
            Save as Preset
          </button>
        )}
      </div>
      
      {/* Font Size Control */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-600 flex items-center">
            Font Size
            {lastChanged === 'fontSize' && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded animate-pulse">
                Updated
              </span>
            )}
          </label>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => handleFontSizeChange(Math.max(0.8, fontScale - 0.1), 'small')}
              className="p-1 rounded hover:bg-gray-100"
              title="Decrease font size"
            >
              <Minimize className="h-3 w-3 text-gray-500" />
            </button>
            <button 
              onClick={() => handleFontSizeChange(Math.min(1.2, fontScale + 0.1), 'large')}
              className="p-1 rounded hover:bg-gray-100"
              title="Increase font size"
            >
              <Maximize className="h-3 w-3 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFontSizeChange(0.9, 'small')}
            className={`px-3 py-1 text-xs rounded ${
              fontSize === 'small'
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Small
          </button>
          <button
            onClick={() => handleFontSizeChange(1.0, 'medium')}
            className={`px-3 py-1 text-xs rounded ${
              fontSize === 'medium'
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleFontSizeChange(1.1, 'large')}
            className={`px-3 py-1 text-xs rounded ${
              fontSize === 'large'
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Large
          </button>
        </div>
      </div>
      
      {/* Line Spacing Control */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-600 flex items-center">
            Content Density
            {lastChanged === 'contentDensity' && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded animate-pulse">
                Updated
              </span>
            )}
          </label>
          <div className="flex items-center text-xs">
            <MoveVertical className="h-3 w-3 mr-1 text-gray-500" />
            <span className="text-gray-500">{lineSpacing.toFixed(1)}</span>
          </div>
        </div>
        <input
          type="range"
          min="1.2"
          max="1.8"
          step="0.1"
          value={lineSpacing}
          onChange={(e) => handleContentDensityChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-1">
          <span className={`px-2 py-0.5 rounded ${contentDensity === 'compact' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Compact</span>
          <span className={`px-2 py-0.5 rounded ${contentDensity === 'medium' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Medium</span>
          <span className={`px-2 py-0.5 rounded ${contentDensity === 'spacious' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Spacious</span>
        </div>
      </div>
      
      {/* Section Spacing Control */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-600 flex items-center">
            Section Spacing
            {lastChanged === 'sectionSpacing' && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded animate-pulse">
                Updated
              </span>
            )}
          </label>
          <div className="flex items-center text-xs">
            <Maximize className="h-3 w-3 mr-1 text-gray-500" />
            <span className="text-gray-500">{sectionSpacing.toFixed(1)}rem</span>
          </div>
        </div>
        <input
          type="range"
          min="0.75"
          max="2"
          step="0.25"
          value={sectionSpacing}
          onChange={(e) => handleSectionSpacingChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-1">
          <span className={`px-2 py-0.5 rounded ${sectionSpacingSize === 'small' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Tight</span>
          <span className={`px-2 py-0.5 rounded ${sectionSpacingSize === 'medium' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Medium</span>
          <span className={`px-2 py-0.5 rounded ${sectionSpacingSize === 'large' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}>Loose</span>
        </div>
      </div>
      
      {/* Warning message */}
      {showWarning && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-start">
          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs text-amber-700">{showWarning}</p>
        </div>
      )}
    </div>
  );
};

export default TypographyControls;
