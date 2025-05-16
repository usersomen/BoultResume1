import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle, X, Download, RefreshCw } from 'lucide-react';
import { analyzeResumeWithGemini, extractTextFromFile, ResumeAnalysisResult } from '../../services/gemini';
import { generatePDFReport } from '../../utils/reportGenerator';

interface ResumeScore extends ResumeAnalysisResult {
  // Additional fields if needed
}

export default function ResumeAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const analyzeResume = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Extract text from the uploaded file
      const fileContent = await extractTextFromFile(file);
      
      // Analyze the resume using Gemini API
      const result = await analyzeResumeWithGemini(fileContent);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Resume analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!analysis) return;

    try {
      const pdfBlob = generatePDFReport(analysis);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume-analysis-report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF report. Please try again.');
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Resume Analysis
          </h2>
          <p className="text-gray-600 mb-8">
            Upload your resume to get detailed insights and suggestions for improvement.
            We'll analyze your resume for ATS compatibility and provide actionable feedback.
          </p>

          {!file ? (
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary transition-colors cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    Drop your resume here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF or Word documents (max 5MB)
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          {file && !analysis && (
            <motion.button
              onClick={analyzeResume}
              disabled={loading}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </motion.button>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-8"
        >
          <div className="max-w-4xl mx-auto">
            {/* Overall Score */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {analysis.overall}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {analysis.atsScore}%
                  </div>
                  <div className="text-sm text-gray-600">ATS Compatibility</div>
                </div>
              </div>
            </div>

            {/* Sections Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Suggested Improvements
                </h3>
                <ul className="space-y-3">
                  {analysis.improvements.map((improvement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Section Analysis */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Section-by-Section Analysis
              </h3>
              {Object.entries(analysis.sections).map(([section, data]) => (
                <div
                  key={section}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-gray-900 font-medium capitalize">
                      {section}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-600">Score:</div>
                      <div className="font-semibold text-primary">
                        {data.score}%
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {data.feedback.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <motion.button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-4 h-4" />
                Analyze Another Resume
              </motion.button>
              <motion.button
                onClick={handleDownloadReport}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download Detailed Report
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 