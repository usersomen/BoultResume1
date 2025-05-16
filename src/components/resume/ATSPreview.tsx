import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, FileText, Search, Info, ArrowRight } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ATSPreviewProps {
  show: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  jobDescription?: string;
}

interface MatchResult {
  category: string;
  score: number;
  missing: string[];
  matches: string[];
}

const ATSPreview: React.FC<ATSPreviewProps> = ({
  show,
  onClose,
  resumeData,
  jobDescription = ''
}) => {
  const [jobDescInput, setJobDescInput] = useState<string>(jobDescription);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showInputForm, setShowInputForm] = useState<boolean>(!jobDescription);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [parsedText, setParsedText] = useState<string>('');

  // Mock function to analyze resume against job description
  const analyzeResume = () => {
    setIsAnalyzing(true);

    // This would be an actual API call in a real implementation
    setTimeout(() => {
      // Generate parsed text from resume data
      const parsedTextContent = generateParsedText(resumeData);
      setParsedText(parsedTextContent);

      // Mock results based on resume data and job description
      const mockResults: MatchResult[] = [
        {
          category: 'Skills',
          score: calculateMockScore(75, 95),
          missing: ['Docker', 'Kubernetes', 'GraphQL'],
          matches: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js']
        },
        {
          category: 'Education',
          score: calculateMockScore(60, 100),
          missing: [],
          matches: ['Bachelor\'s Degree', 'Computer Science']
        },
        {
          category: 'Experience',
          score: calculateMockScore(70, 90),
          missing: ['Team Lead', 'Project Management'],
          matches: ['Software Development', 'Front End', 'Web Development']
        },
        {
          category: 'Keywords',
          score: calculateMockScore(65, 85),
          missing: ['Agile', 'Scrum', 'CI/CD'],
          matches: ['Development', 'Engineering', 'Programming', 'Web']
        }
      ];

      // Calculate overall score
      const calculatedScore = Math.floor(
        mockResults.reduce((acc, result) => acc + result.score, 0) / mockResults.length
      );
      
      setMatchResults(mockResults);
      setOverallScore(calculatedScore);
      setIsAnalyzing(false);
      setShowInputForm(false);
    }, 2000);
  };

  // Helper to generate a random score within a range
  const calculateMockScore = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Generate parsed text representation of the resume
  const generateParsedText = (resume: ResumeData): string => {
    const { personalInfo, experience, education, skills } = resume;
    
    let text = '';
    
    // Personal info
    if (personalInfo) {
      text += `${personalInfo.firstName} ${personalInfo.lastName}\n`;
      text += `${personalInfo.title}\n`;
      text += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n\n`;
      text += `PROFESSIONAL SUMMARY\n${personalInfo.summary}\n\n`;
    }
    
    // Experience
    if (experience && experience.length > 0) {
      text += 'WORK EXPERIENCE\n';
      experience.forEach(job => {
        text += `${job.position} | ${job.company} | ${job.startDate} - ${job.endDate}\n`;
        text += `${job.description}\n`;
        
        if (job.achievements && job.achievements.length > 0) {
          job.achievements.forEach(achievement => {
            text += `• ${achievement}\n`;
          });
        }
        
        text += '\n';
      });
    }
    
    // Education
    if (education && education.length > 0) {
      text += 'EDUCATION\n';
      education.forEach(edu => {
        text += `${edu.degree} in ${edu.field} | ${edu.school} | ${edu.graduationDate}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        text += '\n';
      });
    }
    
    // Skills
    if (skills && skills.length > 0) {
      text += 'SKILLS\n';
      const skillNames = skills.map(skill => skill.name).join(', ');
      text += skillNames + '\n';
    }
    
    return text;
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
          className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-[#4ECCA3] mr-2" />
              <h2 className="text-xl font-bold">ATS Resume Preview</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {showInputForm ? (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Optimize Your Resume for ATS</h3>
                  <p className="text-gray-600">
                    Paste a job description below to see how well your resume matches the requirements.
                    The system will analyze keywords, skills, and experience to give you feedback.
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    value={jobDescInput}
                    onChange={(e) => setJobDescInput(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECCA3] min-h-[200px]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={analyzeResume}
                    disabled={!jobDescInput.trim() || isAnalyzing}
                    className="px-6 py-2.5 bg-[#4ECCA3] text-white rounded-lg hover:bg-[#45B08C] transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full mr-2"></div>
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
              </div>
            ) : (
              <div className="p-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin h-12 w-12 border-4 border-[#4ECCA3] border-opacity-50 border-t-transparent rounded-full mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                    <p className="text-gray-600">This will only take a moment...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column: Results */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold">ATS Compatibility Score</h3>
                            <p className="text-gray-600 text-sm">How well your resume matches the job description</p>
                          </div>
                          <div className="relative h-20 w-20">
                            <svg viewBox="0 0 36 36" className="h-full w-full">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#EEEEEE"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={overallScore >= 85 ? "#4ECCA3" : overallScore >= 70 ? "#FFB400" : "#FF5A5A"}
                                strokeWidth="3"
                                strokeDasharray={`${overallScore}, 100`}
                              />
                              <text 
                                x="18" 
                                y="21" 
                                textAnchor="middle" 
                                fontSize="10" 
                                fill="#333333" 
                                fontWeight="bold"
                              >
                                {overallScore}%
                              </text>
                            </svg>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <div className="flex items-start">
                            {overallScore >= 85 ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium">
                                {overallScore >= 85 
                                  ? 'Great match! Your resume is well-aligned with this job posting.' 
                                  : overallScore >= 70 
                                    ? 'Good match with some improvements needed.' 
                                    : 'Your resume needs significant improvements to match this job.'}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {overallScore >= 85 
                                  ? 'You have a strong chance of passing through ATS systems for this role.' 
                                  : overallScore >= 70 
                                    ? 'Incorporate the suggested missing keywords to improve your chances.' 
                                    : 'We recommend addressing the missing keywords and updating your resume format.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {matchResults.map((result, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                              <div className="flex items-center justify-between p-4 bg-gray-50">
                                <div>
                                  <h4 className="font-semibold">{result.category}</h4>
                                  <div className="flex items-center mt-1">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full rounded-full" 
                                        style={{ 
                                          width: `${result.score}%`,
                                          backgroundColor: result.score >= 85 ? '#4ECCA3' : result.score >= 70 ? '#FFB400' : '#FF5A5A'
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">{result.score}% match</span>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="mb-3">
                                  <h5 className="text-sm font-medium text-gray-700 mb-1">Matched Keywords</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {result.matches.map((keyword, i) => (
                                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {result.missing.length > 0 && (
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-700 mb-1">Missing Keywords</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {result.missing.map((keyword, i) => (
                                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                          <AlertCircle className="h-3 w-3 mr-1" />
                                          {keyword}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setShowInputForm(true)}
                          className="mt-6 text-[#4ECCA3] hover:text-[#45B08C] font-medium flex items-center text-sm"
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Try another job description
                        </button>
                      </div>
                    </div>

                    {/* Right column: ATS View */}
                    <div>
                      <div className="bg-white border rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <FileText className="h-5 w-5 text-gray-500 mr-2" />
                          <h3 className="font-semibold">ATS View</h3>
                        </div>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600">
                            This is how Applicant Tracking Systems see your resume after parsing.
                          </p>
                        </div>
                        <div className="font-mono text-sm bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
                          {parsedText}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 mt-6">
                        <div className="flex items-start">
                          <Info className="h-6 w-6 text-[#4ECCA3] mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold mb-2">ATS Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-start">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                                Use standard section headers (Experience, Education, Skills)
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                                Avoid tables, headers/footers, and text boxes
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                                Include keywords from the job description
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500 mt-1.5 mr-2"></span>
                                Use both abbreviated and full versions of terms
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ATSPreview;
