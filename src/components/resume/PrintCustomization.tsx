import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, X, Check, Settings, Info } from 'lucide-react';

interface PrintCustomizationProps {
  show: boolean;
  onClose: () => void;
  onPrint: (settings: PrintSettings) => void;
}

export interface PrintSettings {
  paperSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  scale: number;
  margins: 'narrow' | 'normal' | 'wide';
  colorMode: 'color' | 'blackAndWhite';
  includeNotes: boolean;
  includeCoverLetter: boolean;
  copies: number;
}

const defaultSettings: PrintSettings = {
  paperSize: 'a4',
  orientation: 'portrait',
  scale: 100,
  margins: 'normal',
  colorMode: 'color',
  includeNotes: false,
  includeCoverLetter: false,
  copies: 1
};

const PrintCustomization: React.FC<PrintCustomizationProps> = ({
  show,
  onClose,
  onPrint
}) => {
  const [settings, setSettings] = useState<PrintSettings>(defaultSettings);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Simulate print process
    setTimeout(() => {
      onPrint(settings);
      setIsPrinting(false);
      onClose();
    }, 1500);
  };

  const updateSetting = <K extends keyof PrintSettings>(
    key: K,
    value: PrintSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
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
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Printer className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">Print Options</h2>
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
            {isPrinting ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#4ECCA3] animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Preparing Print...</h3>
                <p className="text-gray-600">
                  Setting up your resume for printing.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Paper Settings</h3>
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
                        {[
                          { id: 'a4', label: 'A4' },
                          { id: 'letter', label: 'Letter' },
                          { id: 'legal', label: 'Legal' }
                        ].map((size) => (
                          <button
                            key={size.id}
                            onClick={() => updateSetting('paperSize', size.id as any)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                              settings.paperSize === size.id
                                ? 'bg-[#4ECCA3] text-white border-transparent'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                      <div className="flex space-x-3">
                        {[
                          { id: 'portrait', label: 'Portrait' },
                          { id: 'landscape', label: 'Landscape' }
                        ].map((orientation) => (
                          <button
                            key={orientation.id}
                            onClick={() => updateSetting('orientation', orientation.id as any)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                              settings.orientation === orientation.id
                                ? 'bg-[#4ECCA3] text-white border-transparent'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {orientation.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color Mode</label>
                      <div className="flex space-x-3">
                        {[
                          { id: 'color', label: 'Color' },
                          { id: 'blackAndWhite', label: 'Black & White' }
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => updateSetting('colorMode', mode.id as any)}
                            className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                              settings.colorMode === mode.id
                                ? 'bg-[#4ECCA3] text-white border-transparent'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {showAdvancedSettings && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Margins</label>
                          <div className="flex space-x-3">
                            {[
                              { id: 'narrow', label: 'Narrow' },
                              { id: 'normal', label: 'Normal' },
                              { id: 'wide', label: 'Wide' }
                            ].map((margin) => (
                              <button
                                key={margin.id}
                                onClick={() => updateSetting('margins', margin.id as any)}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                                  settings.margins === margin.id
                                    ? 'bg-[#4ECCA3] text-white border-transparent'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {margin.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Scale</label>
                          <div className="flex items-center">
                            <input
                              type="range"
                              min="50"
                              max="150"
                              step="5"
                              value={settings.scale}
                              onChange={(e) => updateSetting('scale', parseInt(e.target.value))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4ECCA3]"
                            />
                            <span className="ml-3 w-12 text-center text-sm font-medium text-gray-700">
                              {settings.scale}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Copies</label>
                          <div className="flex items-center">
                            <button
                              onClick={() => updateSetting('copies', Math.max(1, settings.copies - 1))}
                              className="h-8 w-8 rounded-l-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                              disabled={settings.copies <= 1}
                            >
                              -
                            </button>
                            <div className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300">
                              {settings.copies}
                            </div>
                            <button
                              onClick={() => updateSetting('copies', settings.copies + 1)}
                              className="h-8 w-8 rounded-r-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="includeNotes"
                              type="checkbox"
                              checked={settings.includeNotes}
                              onChange={(e) => updateSetting('includeNotes', e.target.checked)}
                              className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                            />
                            <label htmlFor="includeNotes" className="ml-2 text-sm text-gray-700">
                              Include personal notes
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              id="includeCoverLetter"
                              type="checkbox"
                              checked={settings.includeCoverLetter}
                              onChange={(e) => updateSetting('includeCoverLetter', e.target.checked)}
                              className="h-4 w-4 text-[#4ECCA3] rounded border-gray-300 focus:ring-[#4ECCA3]"
                            />
                            <label htmlFor="includeCoverLetter" className="ml-2 text-sm text-gray-700">
                              Include cover letter (if available)
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 text-sm">Print Tips</h4>
                      <ul className="mt-1 text-sm text-yellow-700 pl-5 list-disc space-y-1">
                        <li>Use high-quality paper (24lb or higher) for best results</li>
                        <li>Print a test copy first to check alignment</li>
                        <li>Black & white is recommended for most employers</li>
                        {settings.paperSize !== 'a4' && (
                          <li>A4 is the standard in most countries outside the US</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!isPrinting && (
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C] transition-colors flex items-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Resume
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrintCustomization;
