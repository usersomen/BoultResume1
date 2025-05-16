import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResumeScoreProps {
  userResumes?: {
    id: string;
    name: string;
    lastModified: string;
  }[];
}

export default function ResumeScore({ userResumes = [] }: ResumeScoreProps) {
  const [selectedTab, setSelectedTab] = useState<'upload' | 'existing'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please upload a PDF or Word document');
        setSelectedFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    try {
      if (!userSession) {
        setError('Please sign in to analyze your resume');
        return;
      }

      setIsAnalyzing(true);
      setError('');

      const formData = new FormData();
      if (selectedFile) {
        formData.append('resume', selectedFile);
      } else if (selectedResumeId) {
        formData.append('resumeId', selectedResumeId);
      }

      // Mock analysis for demonstration
      const mockAnalysis = {
        score: 85,
        sections_found: ['Education', 'Experience', 'Skills'],
        missing_sections: ['Projects', 'Certifications'],
        keywords_found: {
          technical: ['JavaScript', 'React', 'Node.js']
        },
        missing_keywords: {
          technical: ['Python', 'AWS', 'Docker']
        },
        recommendations: [
          'Add a projects section to showcase your practical experience',
          'Include relevant certifications to strengthen your profile',
          'Add more technical keywords related to your target role'
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setAnalysisResult(mockAnalysis);

      // Store analysis in Supabase
      const { error: dbError } = await supabase
        .from('resume_analyses')
        .insert([
          {
            resume_name: selectedFile?.name || 'Existing Resume',
            score: mockAnalysis.score,
            sections_found: mockAnalysis.sections_found,
            missing_sections: mockAnalysis.missing_sections,
            keywords_found: mockAnalysis.keywords_found,
            missing_keywords: mockAnalysis.missing_keywords,
            recommendations: mockAnalysis.recommendations
          }
        ]);

      if (dbError) {
        console.error('Error storing analysis:', dbError);
        throw dbError;
      }

    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-dark-card border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Resume Score Analysis</h2>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'upload'
                ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                : 'bg-dark-lighter text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Resume
          </button>
          <button
            onClick={() => setSelectedTab('existing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'existing'
                ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                : 'bg-dark-lighter text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Existing Resumes
          </button>
        </div>

        {/* Upload Section */}
        {selectedTab === 'upload' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-accent-purple" />
                </div>
                <div>
                  <p className="text-white font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">PDF or Word documents only</p>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between bg-dark-lighter p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent-purple" />
                  <span className="text-white">{selectedFile.name}</span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Existing Resumes Section */}
        {selectedTab === 'existing' && (
          <div className="space-y-4">
            {userResumes.length > 0 ? (
              userResumes.map((resume) => (
                <div
                  key={resume.id}
                  onClick={() => setSelectedResumeId(resume.id)}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedResumeId === resume.id
                      ? 'bg-accent-purple/10 border border-accent-purple'
                      : 'bg-dark-lighter hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${
                      selectedResumeId === resume.id ? 'text-accent-purple' : 'text-gray-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">{resume.name}</p>
                      <p className="text-sm text-gray-400">Last modified: {resume.lastModified}</p>
                    </div>
                  </div>
                  {selectedResumeId === resume.id && (
                    <CheckCircle className="w-5 h-5 text-accent-purple" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No resumes found. Upload a new resume to get started.</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || (!selectedFile && !selectedResumeId)}
          className={`mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-medium transition-all ${
            isAnalyzing || (!selectedFile && !selectedResumeId)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-glow'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              Analyze Resume
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 space-y-6"
            >
              {/* Score */}
              <div className="bg-dark-lighter p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Resume Score</h3>
                  <div className="text-3xl font-bold text-accent-purple">
                    {analysisResult.score}/100
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all"
                    style={{ width: `${analysisResult.score}%` }}
                  />
                </div>
              </div>

              {/* Sections */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-dark-lighter p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Found Sections</h3>
                  <div className="space-y-2">
                    {analysisResult.sections_found.map((section: string) => (
                      <div key={section} className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-lighter p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Missing Sections</h3>
                  <div className="space-y-2">
                    {analysisResult.missing_sections.map((section: string) => (
                      <div key={section} className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Keywords Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-400 mb-2">Technical Keywords Found</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords_found.technical.map((keyword: string) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missing_keywords.technical.map((keyword: string) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-red-400/10 text-red-400 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-purple text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}