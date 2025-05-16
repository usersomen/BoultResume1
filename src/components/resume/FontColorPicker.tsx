import React, { useState } from 'react';
import { Type, PaintBucket, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FontColorPickerProps {
  show: boolean;
  onClose: () => void;
  onApplyChanges: (font: string, color: string) => void;
  currentFont: string;
  currentColor: string;
}

// Available font options
const fontOptions = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Raleway', value: 'Raleway, sans-serif' }
];

// Color palette options
const colorOptions = [
  { name: 'Professional Green', value: '#4ECCA3' },
  { name: 'Classic Blue', value: '#2563eb' },
  { name: 'Royal Purple', value: '#7e22ce' },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Charcoal', value: '#334155' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Navy', value: '#1e3a8a' }
];

const FontColorPicker: React.FC<FontColorPickerProps> = ({
  show,
  onClose,
  onApplyChanges,
  currentFont,
  currentColor
}) => {
  const [selectedFont, setSelectedFont] = useState<string>(currentFont);
  const [selectedColor, setSelectedColor] = useState<string>(currentColor);

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
              <Type className="h-5 w-5 text-gray-700 mr-2" />
              <h2 className="text-xl font-bold">Customize Resume Style</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {/* Font selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <Type className="h-4 w-4 mr-2" />
                Font Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fontOptions.map((font) => (
                  <button
                    key={font.name}
                    className={`p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      selectedFont === font.value
                        ? 'border-[#4ECCA3] bg-[#4ECCA3]/10'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedFont(font.value)}
                  >
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                    {selectedFont === font.value && (
                      <Check className="h-4 w-4 text-[#4ECCA3]" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Font preview */}
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <h4
                  style={{ fontFamily: selectedFont }}
                  className="text-xl font-bold mb-1"
                >
                  Jane Doe
                </h4>
                <p style={{ fontFamily: selectedFont }} className="text-sm">
                  This is how your resume text will appear with the selected font.
                </p>
              </div>
            </div>

            {/* Color selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <PaintBucket className="h-4 w-4 mr-2" />
                Color Theme
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    className={`relative h-14 border rounded-lg hover:opacity-90 transition-opacity ${
                      selectedColor === color.value
                        ? 'ring-2 ring-offset-2 ring-gray-400'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.name}
                  >
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1">
                          <Check className="h-4 w-4 text-black" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Color preview */}
              <div className="mt-4 p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <div
                  style={{ backgroundColor: selectedColor }}
                  className="h-2 w-full rounded mb-2"
                ></div>
                <div className="flex items-center space-x-2">
                  <div
                    style={{ backgroundColor: selectedColor }}
                    className="w-6 h-6 rounded-full"
                  ></div>
                  <p
                    style={{ color: selectedColor }}
                    className="font-semibold"
                  >
                    Section Heading
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApplyChanges(selectedFont, selectedColor);
                onClose();
              }}
              className="px-4 py-2 bg-[#4ECCA3] text-white rounded hover:bg-[#45B08C] transition-colors flex items-center"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Style
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FontColorPicker;
