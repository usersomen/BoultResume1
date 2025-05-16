import React, { useState } from 'react';
import { PenLine, Lightbulb, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIWritingAssistantProps {
  show: boolean;
  onClose: () => void;
  onApplySuggestion: (text: string) => void;
  currentText: string;
  section: string;
  jobTitle?: string;
}

// Mock AI suggestion prompts by section
const sectionPrompts: Record<string, string[]> = {
  summary: [
    "Highlight your achievements and expertise",
    "Emphasize your years of experience",
    "Showcase your leadership abilities",
    "Mention your technical skills and certifications",
    "Highlight your problem-solving approach"
  ],
  employment: [
    "Describe your achievements with metrics",
    "Focus on leadership and team collaboration",
    "Highlight technical skills used in this role",
    "Emphasize project management experience",
    "Detail client relationship management"
  ],
  education: [
    "Highlight academic achievements and honors",
    "Mention relevant coursework",
    "Include research projects and publications",
    "Detail extracurricular leadership roles"
  ],
  skills: [
    "Add industry-specific technical skills",
    "Include soft skills like communication",
    "List certifications and advanced training",
    "Specify language proficiencies"
  ]
};

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  show,
  onClose,
  onApplySuggestion,
  currentText,
  section,
  jobTitle = "professional"
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  // This would connect to a real AI API in production
  const generateSuggestion = (prompt: string) => {
    setIsGenerating(true);
    setSelectedPrompt(prompt);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let generatedText = "";
      
      // Generate different mock text based on the section and prompt
      if (section === "summary") {
        if (prompt.includes("achievements")) {
          generatedText = `Accomplished ${jobTitle} with a proven track record of exceeding targets and delivering impactful results across multiple projects. Skilled in leveraging data-driven insights to optimize processes and drive strategic initiatives, resulting in significant improvements in efficiency and ROI.`;
        } else if (prompt.includes("leadership")) {
          generatedText = `Dynamic ${jobTitle} with exceptional leadership abilities, demonstrated through successful management of cross-functional teams and high-stakes projects. Adept at fostering collaboration, mentoring team members, and creating an environment that promotes innovation and excellence.`;
        } else if (prompt.includes("technical")) {
          generatedText = `Technically proficient ${jobTitle} with extensive experience in implementing cutting-edge solutions that address complex business challenges. Certified in multiple industry-standard methodologies with a commitment to staying at the forefront of technological advancements.`;
        } else {
          generatedText = `Results-oriented ${jobTitle} with ${Math.floor(Math.random() * 10) + 3} years of experience delivering excellence in fast-paced environments. Combines strategic thinking with practical execution to consistently exceed expectations and drive organizational success.`;
        }
      } else if (section === "employment") {
        generatedText = `• Led cross-functional team of ${Math.floor(Math.random() * 10) + 3} professionals, resulting in ${Math.floor(Math.random() * 30) + 10}% improvement in project delivery time\n• Implemented innovative solutions that reduced operational costs by ${Math.floor(Math.random() * 20) + 10}%\n• Recognized with performance award for exceeding quarterly targets by ${Math.floor(Math.random() * 20) + 15}%`;
      }
      
      setSuggestion(generatedText);
      setIsGenerating(false);
    }, 1500);
  };

  if (!show) return null;

  const prompts = sectionPrompts[section] || ["Generate a professional suggestion"];

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
              <PenLine className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">AI Writing Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">What would you like help with?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={`p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors flex items-start ${
                      selectedPrompt === prompt ? 'border-[#4ECCA3] bg-[#4ECCA3]/10' : 'border-gray-200'
                    }`}
                    onClick={() => generateSuggestion(prompt)}
                    disabled={isGenerating}
                  >
                    <Lightbulb className="h-5 w-5 text-[#4ECCA3] mr-2 flex-shrink-0 mt-0.5" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-[#4ECCA3] animate-spin mb-2" />
                <p className="text-gray-600">Generating suggestion...</p>
              </div>
            ) : suggestion ? (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">AI Suggestion</h3>
                <div className="bg-gray-50 p-4 rounded-lg border mb-2">
                  {suggestion}
                </div>
                <p className="text-xs text-gray-500">This is an AI-generated suggestion. Review and edit as needed before applying.</p>
              </div>
            ) : null}
          </div>

          <div className="p-4 border-t flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onApplySuggestion(suggestion)}
              className="px-4 py-2 bg-[#4ECCA3] text-white rounded hover:bg-[#45B08C] transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!suggestion || isGenerating}
            >
              <Check className="h-4 w-4 mr-2" />
              Use This Suggestion
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIWritingAssistant;
