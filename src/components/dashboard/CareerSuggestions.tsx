import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, DollarSign, GraduationCap, MapPin, BarChart2, AlertCircle } from 'lucide-react';

interface CareerPath {
  title: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  growth: number;
  requirements: string[];
  skills: string[];
  companies: string[];
  locations: string[];
}

export default function CareerSuggestions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [careers, setCareers] = useState<CareerPath[] | null>(null);

  const analyzeCareers = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Integrate with Gemini API
      // For now, using mock data
      const mockCareers: CareerPath[] = [
        {
          title: 'Senior Frontend Developer',
          description: 'Lead frontend development projects and mentor junior developers while implementing modern web technologies.',
          salary: {
            min: 100000,
            max: 160000,
            currency: 'USD'
          },
          growth: 25,
          requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '5+ years of frontend development experience',
            'Strong portfolio of web applications'
          ],
          skills: [
            'React.js',
            'TypeScript',
            'Next.js',
            'GraphQL',
            'UI/UX Design'
          ],
          companies: [
            'Google',
            'Meta',
            'Amazon',
            'Microsoft'
          ],
          locations: [
            'San Francisco, CA',
            'New York, NY',
            'Seattle, WA'
          ]
        },
        // Add more mock career paths
      ];

      setCareers(mockCareers);
    } catch (err) {
      setError('Failed to analyze career paths. Please try again.');
      console.error('Career analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically analyze on component mount
  useEffect(() => {
    analyzeCareers();
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Career Path Suggestions
          </h2>
          <p className="text-gray-600 mb-8">
            Discover personalized career paths based on your skills, experience, and market trends
          </p>
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
            <p className="text-gray-600">Analyzing career paths...</p>
          </div>
        )}

        {/* Career Paths */}
        {careers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {careers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {career.title}
                    </h3>
                    <p className="text-gray-600">{career.description}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{career.growth}% Growth</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Salary Range */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Salary Range
                      </h4>
                      <p className="text-gray-600">
                        {career.salary.currency} {career.salary.min.toLocaleString()} - {career.salary.max.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Requirements
                      </h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        {career.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Companies */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Top Companies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.companies.map((company, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Top Locations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.locations.map((location, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-sm"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 