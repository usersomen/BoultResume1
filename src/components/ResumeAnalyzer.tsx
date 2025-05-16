import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle, X, ArrowRight, Lock } from 'lucide-react';
import AuthModal from './AuthModal';

interface ResumeAnalyzerProps {
  onLogin?: () => void;
}

export default function ResumeAnalyzer({ onLogin }: ResumeAnalyzerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setError('');
        if (!isAuthenticated) {
          setShowAuthModal(true);
        }
      } else {
        setError('Please upload a PDF or Word document');
        setSelectedFile(null);
      }
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    if (onLogin) {
      onLogin();
    }
  };

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsAnalyzing(true);
      setError('');

      const formData = new FormData();
      if (selectedFile) {
        formData.append('resume', selectedFile);
      }

      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-dark-card border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Resume Score Analysis</h2>

          {/* Upload Section */}
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
                  <p className="text-gray-400 text-sm">PDF or Word documents only</p>
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

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {!isAuthenticated && selectedFile && (
            <div className="mt-4 flex items-center gap-2 text-blue-400 bg-blue-400/10 p-4 rounded-lg">
              <Lock className="w-5 h-5" />
              <span>Please sign in or create an account to analyze your resume</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !selectedFile}
            className={`mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-medium transition-all ${
              isAnalyzing || !selectedFile
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
                {isAuthenticated ? 'Analyze Resume' : 'Sign in to Analyze'}
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

                {/* Rest of the analysis results components */}
                {/* ... (Keep the existing analysis results sections) ... */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}