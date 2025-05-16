import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  BarChart, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

// Define AI tools
const aiTools = [
  {
    id: 'resume-analyzer',
    title: 'Resume Analyzer',
    description: 'Get detailed feedback on your resume with AI-powered analysis',
    icon: BarChart,
    color: 'bg-blue-500',
    status: 'available'
  },
  {
    id: 'job-description-matcher',
    title: 'Job Description Matcher',
    description: 'Optimize your resume for specific job descriptions',
    icon: FileText,
    color: 'bg-purple-500',
    status: 'available'
  },
  {
    id: 'interview-coach',
    title: 'Interview Coach',
    description: 'Practice interviews with AI and get feedback on your responses',
    icon: MessageSquare,
    color: 'bg-green-500',
    status: 'available'
  },
  {
    id: 'skill-enhancer',
    title: 'Skill Enhancer',
    description: 'Improve how you present your skills with powerful suggestions',
    icon: Zap,
    color: 'bg-amber-500',
    status: 'available'
  },
  {
    id: 'career-path-advisor',
    title: 'Career Path Advisor',
    description: 'Get personalized career growth recommendations',
    icon: Sparkles,
    color: 'bg-rose-500',
    status: 'coming-soon'
  }
];

export default function AITools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
        <p className="text-gray-600">Enhance your resume with our AI-powered tools</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              {tool.status === 'available' ? (
                <motion.button
                  onClick={() => setSelectedTool(tool.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <div className="flex items-center gap-2 text-gray-500">
                  <AlertCircle className="w-4 h-4" />
                  <span>Coming soon</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Tool */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white p-1 rounded-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-primary">Featured Tool</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ATS Optimization Assistant</h2>
            <p className="text-gray-700 mb-6">
              Our most powerful AI tool helps your resume pass through Applicant Tracking Systems (ATS) 
              with flying colors. Get specific recommendations to improve your resume's visibility and ranking.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Keyword optimization for your industry',
                'Format checking for ATS compatibility',
                'Section improvement recommendations',
                'Overall ATS score with detailed breakdown'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
            >
              Optimize Your Resume
            </motion.button>
          </div>
          <div className="md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">ATS Score Preview</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium">Overall Score</span>
                <span className="text-lg font-bold text-primary">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-primary rounded-full h-2" style={{ width: '92%' }} />
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Keyword Match', score: 88 },
                  { label: 'Format Compatibility', score: 95 },
                  { label: 'Section Organization', score: 90 },
                  { label: 'Content Quality', score: 94 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary rounded-full h-1.5" 
                        style={{ width: `${item.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}