import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, ThumbsUp, ThumbsDown, RotateCcw, Send } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Answer {
  questionId: string;
  answer: string;
  feedback: {
    strengths: string[];
    improvements: string[];
    score: number;
  };
}

export default function InterviewPrep() {
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<Answer['feedback'] | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  const generateQuestion = async () => {
    if (!jobTitle) {
      setError('Please enter a job title');
      return;
    }

    setLoading(true);
    setError(null);
    setFeedback(null);
    setUserAnswer('');

    try {
      // TODO: Integrate with Gemini API
      // For now, using mock data
      const mockQuestion: Question = {
        id: Math.random().toString(36).substr(2, 9),
        question: 'Tell me about a challenging project you worked on and how you overcame obstacles to complete it successfully.',
        category: 'behavioral',
        difficulty: 'medium'
      };

      setCurrentQuestion(mockQuestion);
    } catch (err) {
      setError('Failed to generate question. Please try again.');
      console.error('Question generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Integrate with Gemini API
      // For now, using mock data
      const mockFeedback = {
        strengths: [
          'Good use of the STAR method',
          'Clear explanation of the problem',
          'Demonstrated leadership skills'
        ],
        improvements: [
          'Could provide more specific metrics',
          'Consider mentioning the long-term impact'
        ],
        score: 8
      };

      setFeedback(mockFeedback);
      if (currentQuestion) {
        setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
      }
    } catch (err) {
      setError('Failed to analyze answer. Please try again.');
      console.error('Answer analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetQuestion = () => {
    setCurrentQuestion(null);
    setUserAnswer('');
    setFeedback(null);
    setError(null);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interview Preparation
          </h2>
          <p className="text-gray-600 mb-8">
            Practice answering interview questions with AI-powered feedback
          </p>
        </div>

        {/* Job Title Input */}
        {!currentQuestion && (
          <div className="space-y-4">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter target job title (e.g., Frontend Developer)"
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <div className="flex justify-end">
              <motion.button
                onClick={generateQuestion}
                disabled={loading}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                {loading ? 'Generating...' : 'Generate Question'}
              </motion.button>
            </div>
          </div>
        )}

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

        {/* Question and Answer Section */}
        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Question Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium
                    ${currentQuestion.category === 'behavioral' ? 'bg-blue-100 text-blue-600' : ''}
                    ${currentQuestion.category === 'technical' ? 'bg-green-100 text-green-600' : ''}
                    ${currentQuestion.category === 'situational' ? 'bg-purple-100 text-purple-600' : ''}
                  `}>
                    {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium
                    ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-600' : ''}
                    ${currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' : ''}
                    ${currentQuestion.difficulty === 'hard' ? 'bg-red-100 text-red-600' : ''}
                  `}>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </span>
                </div>
                <motion.button
                  onClick={resetQuestion}
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-gray-900 text-lg">{currentQuestion.question}</p>
            </div>

            {/* Answer Section */}
            {!feedback && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-48 p-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                <div className="flex justify-end">
                  <motion.button
                    onClick={submitAnswer}
                    disabled={loading}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    {loading ? 'Analyzing...' : 'Submit Answer'}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Feedback
                  </h3>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium">Score: {feedback.score}/10</span>
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-orange-600" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {feedback.improvements.map((improvement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Question Button */}
                <div className="pt-4 border-t border-gray-100">
                  <motion.button
                    onClick={generateQuestion}
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Next Question
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 