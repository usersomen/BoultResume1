import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle, Send, Copy, Check } from 'lucide-react';

interface Improvement {
  original: string;
  improved: string;
  explanation: string;
  type: 'grammar' | 'clarity' | 'professionalism' | 'impact';
}

export default function QuickImprove() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [improvements, setImprovements] = useState<Improvement[] | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const handleImprove = async () => {
    if (!text.trim()) {
      setError('Please enter some text to improve');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Integrate with Gemini API
      // For now, using mock data
      const mockImprovements: Improvement[] = [
        {
          original: 'I have 5 years experience in web development.',
          improved: 'I bring 5 years of expertise in full-stack web development, specializing in modern JavaScript frameworks.',
          explanation: 'Added specificity and highlighted specialization to create more impact.',
          type: 'impact'
        },
        {
          original: 'Led team of developers.',
          improved: 'Led a cross-functional team of 8 developers, delivering 3 major projects ahead of schedule.',
          explanation: 'Quantified achievements and added specific outcomes.',
          type: 'professionalism'
        },
        // Add more mock improvements
      ];

      setImprovements(mockImprovements);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error('Text improvement error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Improve
          </h2>
          <p className="text-gray-600 mb-8">
            Enhance your professional writing with AI-powered suggestions
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to improve (e.g., resume bullet points, LinkedIn descriptions, cover letter excerpts)"
            className="w-full h-40 p-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
          <div className="flex justify-end">
            <motion.button
              onClick={handleImprove}
              disabled={loading}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              {loading ? 'Improving...' : 'Improve Text'}
            </motion.button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Analyzing and improving text...</p>
          </div>
        )}

        {/* Improvements */}
        {improvements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-4 flex-1">
                    {/* Original Text */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Original
                      </h4>
                      <p className="text-gray-900">{improvement.original}</p>
                    </div>

                    {/* Improved Text */}
                    <div>
                      <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Improved
                      </h4>
                      <p className="text-gray-900">{improvement.improved}</p>
                    </div>

                    {/* Explanation */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        {improvement.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <motion.button
                    onClick={() => copyToClipboard(improvement.improved, index)}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied === index ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>

                {/* Improvement Type */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium
                    ${improvement.type === 'grammar' ? 'bg-blue-100 text-blue-600' : ''}
                    ${improvement.type === 'clarity' ? 'bg-green-100 text-green-600' : ''}
                    ${improvement.type === 'professionalism' ? 'bg-purple-100 text-purple-600' : ''}
                    ${improvement.type === 'impact' ? 'bg-orange-100 text-orange-600' : ''}
                  `}>
                    {improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 