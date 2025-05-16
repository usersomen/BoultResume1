import React, { useState } from 'react';
import { Search, Award, CheckCircle, XCircle, ArrowRight, Loader2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ATSOptimizerProps {
  show: boolean;
  onClose: () => void;
  resumeData: any;
  onApplySuggestion: (field: string, value: string) => void;
}

const ATSOptimizer: React.FC<ATSOptimizerProps> = ({
  show,
  onClose,
  resumeData,
  onApplySuggestion
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    score: number;
    keywordMatches: { keyword: string; found: boolean }[];
    missingSuggestions: { keyword: string; suggestion: string }[];
    sectionImprovements: {
      section: string;
      original: string;
      improved: string;
    }[];
    generalSuggestions: string[];
  }>(null);

  // This would connect to a real AI API in production
  const analyzeResumeForATS = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Extract keywords from job description - this would be done by AI
      const keywords = extractKeywords(jobDescription);
      
      // Check which keywords are in the resume - this would be done by AI
      const keywordMatches = keywords.map(keyword => ({
        keyword,
        found: isKeywordInResume(keyword, resumeData)
      }));
      
      // Calculate match score
      const matchCount = keywordMatches.filter(k => k.found).length;
      const score = Math.round((matchCount / keywords.length) * 100);
      
      // Generate suggestions for missing keywords
      const missingSuggestions = keywordMatches
        .filter(k => !k.found)
        .map(k => ({
          keyword: k.keyword,
          suggestion: generateSuggestionForKeyword(k.keyword)
        }));
      
      // Generate section improvements
      const sectionImprovements = [
        {
          section: 'summary',
          original: resumeData.summary,
          improved: improveSummary(resumeData.summary, jobDescription)
        },
        {
          section: 'skills',
          original: resumeData.skills.join(', '),
          improved: improveSkills(resumeData.skills, jobDescription).join(', ')
        }
      ];
      
      // General suggestions
      const generalSuggestions = [
        'Use action verbs at the beginning of bullet points',
        'Quantify achievements with specific metrics and numbers',
        'Remove personal pronouns (I, my, me) from your resume',
        'Ensure your resume is properly formatted for ATS scanning',
        'Tailor your experience to highlight relevant achievements'
      ];
      
      // Set the analysis result
      setAnalysisResult({
        score,
        keywordMatches,
        missingSuggestions,
        sectionImprovements,
        generalSuggestions
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // Mock function to extract keywords from job description
  const extractKeywords = (jobDescription: string): string[] => {
    const text = jobDescription.toLowerCase();
    const keywords = [
      'project management',
      'communication',
      'leadership',
      'problem solving',
      'teamwork',
      'analytical',
      'technical skills',
      'collaboration',
      'organization',
      'time management',
      'detail-oriented',
      'innovation'
    ];
    
    // Return keywords that appear in the job description
    return keywords.filter(keyword => text.includes(keyword.toLowerCase()));
  };
  
  // Check if keyword exists in resume data
  const isKeywordInResume = (keyword: string, resumeData: any): boolean => {
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    return resumeText.includes(keyword.toLowerCase());
  };
  
  // Generate a suggestion for a missing keyword
  const generateSuggestionForKeyword = (keyword: string): string => {
    const suggestions: Record<string, string> = {
      'project management': 'Add a bullet point about managing projects or coordinating team efforts',
      'communication': 'Highlight your communication skills in your summary or job descriptions',
      'leadership': 'Mention team leadership or initiative-taking in your experience',
      'problem solving': 'Include examples of problems you solved in your position descriptions',
      'teamwork': 'Emphasize collaborative achievements in your work experience',
      'analytical': 'Add analytical skills to your skills section and provide examples in your experience',
      'technical skills': 'List relevant technical skills in your skills section',
      'collaboration': 'Highlight cross-functional collaboration in your experience',
      'organization': 'Mention organizational abilities in your summary or skills',
      'time management': 'Include examples of meeting deadlines or handling multiple priorities',
      'detail-oriented': 'Highlight attention to detail in your summary or skills section',
      'innovation': 'Include examples of innovative solutions or creative approaches'
    };
    
    return suggestions[keyword.toLowerCase()] || `Consider adding "${keyword}" to your resume`;
  };
  
  // Mock function to improve summary
  const improveSummary = (summary: string, jobDescription: string): string => {
    // In a real implementation, this would use AI to analyze and improve
    return `Accomplished professional with expertise in ${extractKeywords(jobDescription).slice(0, 3).join(', ')}, and a proven track record of delivering impactful results. Skilled in leveraging data-driven insights to optimize processes and drive strategic initiatives, resulting in significant improvements in efficiency.`;
  };
  
  // Mock function to improve skills
  const improveSkills = (skills: string[], jobDescription: string): string[] => {
    // In a real implementation, this would use AI to analyze and suggest missing skills
    const existingSkills = new Set(skills.map(s => s.toLowerCase()));
    const suggestedSkills = extractKeywords(jobDescription)
      .filter(keyword => !existingSkills.has(keyword.toLowerCase()))
      .map(keyword => keyword.charAt(0).toUpperCase() + keyword.slice(1));
    
    return [...skills, ...suggestedSkills];
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
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center">
              <Search className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">ATS Resume Optimizer</h2>
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
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Paste Job Description</h3>
              <p className="text-sm text-gray-500 mb-2">
                Paste the job description to analyze how well your resume matches the requirements
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#4ECCA3]"
              />
              <button
                onClick={analyzeResumeForATS}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="mt-2 px-4 py-2 bg-[#4ECCA3] text-white rounded hover:bg-[#45B08C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-[#4ECCA3] animate-spin mb-2" />
                <p className="text-gray-600">Analyzing your resume against the job description...</p>
              </div>
            )}

            {!isAnalyzing && analysisResult && (
              <div className="space-y-6">
                {/* ATS Compatibility Score */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Award className="h-5 w-5 text-[#4ECCA3] mr-2" />
                    ATS Compatibility Score
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                      <div
                        className={`h-4 rounded-full ${
                          analysisResult.score >= 80
                            ? 'bg-green-500'
                            : analysisResult.score >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${analysisResult.score}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold w-16 text-right">
                      {analysisResult.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {analysisResult.score >= 80
                      ? 'Excellent match! Your resume is well-aligned with this job description.'
                      : analysisResult.score >= 60
                      ? 'Good match, but there is room for improvement.'
                      : 'Your resume needs significant updates to match this job description.'}
                  </p>
                </div>

                {/* Keyword Matches */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">Keyword Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {analysisResult.keywordMatches.map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 border rounded"
                      >
                        {match.found ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={match.found ? 'text-green-700' : 'text-red-700'}
                        >
                          {match.keyword}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Keyword Suggestions */}
                {analysisResult.missingSuggestions.length > 0 && (
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Missing Keyword Suggestions</h3>
                    <div className="space-y-3">
                      {analysisResult.missingSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-yellow-50 rounded border border-yellow-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-yellow-800">
                                Missing: "{suggestion.keyword}"
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {suggestion.suggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Improvements */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">AI-Suggested Improvements</h3>
                  <div className="space-y-4">
                    {analysisResult.sectionImprovements.map((improvement, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium capitalize flex items-center">
                          {improvement.section} Section
                          <button
                            onClick={() => onApplySuggestion(improvement.section, improvement.improved)}
                            className="ml-auto text-xs bg-[#4ECCA3] text-white px-2 py-1 rounded flex items-center"
                          >
                            Apply <ArrowRight className="h-3 w-3 ml-1" />
                          </button>
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 rounded border text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-500">Current</span>
                            </div>
                            <p className="whitespace-pre-wrap">{improvement.original}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded border border-green-200 text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-semibold text-green-600">Improved</span>
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy to clipboard"
                                onClick={() => navigator.clipboard.writeText(improvement.improved)}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="whitespace-pre-wrap">{improvement.improved}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* General Suggestions */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">General ATS Tips</h3>
                  <ul className="space-y-2">
                    {analysisResult.generalSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#4ECCA3] mr-2">•</span>
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ATSOptimizer;
