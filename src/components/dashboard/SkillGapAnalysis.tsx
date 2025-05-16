import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, ChevronRight, Plus, AlertCircle } from 'lucide-react';

interface SkillGap {
  skill: string;
  importance: number;
  currentLevel: number;
  requiredLevel: number;
  resources: {
    title: string;
    type: 'course' | 'tutorial' | 'documentation';
    url: string;
  }[];
}

export default function SkillGapAnalysis() {
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SkillGap[] | null>(null);

  const handleAnalyze = async () => {
    if (!jobTitle) {
      setError('Please enter a job title');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Integrate with Gemini API
      // For now, using mock data
      const mockAnalysis: SkillGap[] = [
        {
          skill: 'React.js',
          importance: 9,
          currentLevel: 7,
          requiredLevel: 8,
          resources: [
            {
              title: 'Advanced React Patterns',
              type: 'course',
              url: 'https://example.com/course'
            },
            {
              title: 'React Performance Optimization',
              type: 'tutorial',
              url: 'https://example.com/tutorial'
            }
          ]
        },
        {
          skill: 'TypeScript',
          importance: 8,
          currentLevel: 6,
          requiredLevel: 8,
          resources: [
            {
              title: 'TypeScript Deep Dive',
              type: 'documentation',
              url: 'https://example.com/docs'
            }
          ]
        },
        // Add more mock skills
      ];

      setAnalysis(mockAnalysis);
    } catch (err) {
      setError('Failed to analyze skill gaps. Please try again.');
      console.error('Skill gap analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Skill Gap Analysis
          </h2>
          <p className="text-gray-600 mb-8">
            Enter your target job title to identify skill gaps and get personalized learning recommendations
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter target job title (e.g., Senior Frontend Developer)"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <motion.button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Target className="w-5 h-5" />
            {loading ? 'Analyzing...' : 'Analyze Skills'}
          </motion.button>
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

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {analysis.map((item, index) => (
              <div
                key={item.skill}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.skill}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Importance: {item.importance}/10
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">
                      Current Level: {item.currentLevel}/10
                    </div>
                    <div className="text-sm font-medium text-primary">
                      Required Level: {item.requiredLevel}/10
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-gray-100 rounded-full mb-4">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full"
                    style={{
                      width: `${(item.currentLevel / item.requiredLevel) * 100}%`,
                    }}
                  />
                </div>

                {/* Learning Resources */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Recommended Resources
                  </h4>
                  {item.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Plus className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {resource.title}
                          </div>
                          <div className="text-xs text-gray-600 capitalize">
                            {resource.type}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 