import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Brain,
  Award,
  Plus,
  ChevronRight,
  Copy,
  CheckCircle,
  BarChart2,
  Target,
  Briefcase,
  Search,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const navigate = useNavigate();
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  // Mock user data (this would come from auth context in a real app)
  const userData = {
    name: 'John',
    resumes: [
      {
        id: 1,
        title: 'Software Engineer Resume',
        lastEdited: '2 hours ago',
        completionScore: 85
      },
      {
        id: 2,
        title: 'Product Manager Application',
        lastEdited: '1 week ago',
        completionScore: 95,
        isPending: true
      }
    ]
  };

  // Stats data
  const stats = [
    {
      id: 'resume-score',
      label: 'Resume Score',
      value: '85',
      icon: Award,
      color: '#4ECCA3'
    },
    {
      id: 'ats-score',
      label: 'ATS Score',
      value: 92,
      icon: CheckCircle,
      color: '#4ECCA3'
    }
  ];

  // Job recommendations based on resume
  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      matchScore: 92,
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      location: 'Remote',
      matchScore: 88,
      postedDate: '1 week ago'
    }
  ];

  // ATS Optimization suggestions
  const atsOptimizations = [
    {
      id: 1,
      title: 'Add more quantifiable achievements',
      description: 'Include metrics and specific results to highlight your impact',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Tailor your skills section',
      description: 'Align your skills with those mentioned in job descriptions',
      priority: 'Medium'
    }
  ];

  const handleCreateNew = () => {
    setShowCreateOptions(!showCreateOptions);
  };

  const handleCreateFresh = () => {
    navigate('/dashboard/resumes');
    setShowCreateOptions(false);
  };

  const handleDuplicateExisting = () => {
    // In a real app, you would navigate to a resume selection screen
    navigate('/dashboard/resumes');
    setShowCreateOptions(false);
  };

  const handleBuildFresh = () => {
    navigate('/resume/create');
  };

  const handleResumeClick = (id) => {
    // In a real app, you would navigate to the resume editor
    console.log(`Navigating to resume ${id}`);
  };

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#4ECCA3]/20 to-[#4ECCA3]/5 p-8 rounded-2xl border border-[#4ECCA3]/20"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-400 mt-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="relative">
            <motion.button
              onClick={handleCreateNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#4ECCA3] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#45B08C] transition-all"
            >
              <Plus className="w-5 h-5" />
              Create New Resume
            </motion.button>
            
            {/* Create options dropdown */}
            {showCreateOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-14 z-10 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden w-64"
              >
                <button
                  onClick={handleBuildFresh}
                  className="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#4ECCA3]" />
                  <div>
                    <p className="text-white font-medium">Build Fresh</p>
                    <p className="text-gray-400 text-sm">Start from a blank template</p>
                  </div>
                </button>
                <button
                  onClick={handleDuplicateExisting}
                  className="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-5 h-5 text-[#4ECCA3]" />
                  <div>
                    <p className="text-white font-medium">Duplicate Existing</p>
                    <p className="text-gray-400 text-sm">Build from an existing resume</p>
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Pending Resume Card (only shows if there's a pending resume) */}
      {userData.resumes.some(resume => resume.isPending) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Continue where you left off</h2>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" /> Last edited: {userData.resumes.find(r => r.isPending)?.lastEdited}
            </span>
          </div>
          <div className="p-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              onClick={() => handleResumeClick(userData.resumes.find(r => r.isPending).id)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#4ECCA3]/20 rounded-lg">
                  <FileText className="w-6 h-6 text-[#4ECCA3]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{userData.resumes.find(r => r.isPending)?.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-full max-w-[200px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-400">Completion</span>
                        <span className="text-xs font-medium text-[#4ECCA3]">{userData.resumes.find(r => r.isPending)?.completionScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#4ECCA3] rounded-full h-2" 
                          style={{ width: `${userData.resumes.find(r => r.isPending)?.completionScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#4ECCA3] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#45B08C] transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Continue Editing
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Stats and ATS Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Stats */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Resume Analytics</h2>
            </div>
            <div className="p-6 grid grid-cols-1 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-gray-300">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ATS Optimization Assistant */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">ATS Optimization Assistant</h2>
            </div>
            <div className="p-6 space-y-6">
              {atsOptimizations.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#4ECCA3]/20">
                    <Target className="w-5 h-5 text-[#4ECCA3]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.priority === 'High' ? 'bg-red-500/20 text-red-400' : 
                        item.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                <Brain className="w-5 h-5" />
                <span>Get More AI Suggestions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Recommended Jobs</h2>
          <button className="text-[#4ECCA3] hover:text-[#45B08C] flex items-center gap-1 text-sm font-medium transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-700">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-700">
                  <Briefcase className="w-5 h-5 text-[#4ECCA3]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{job.title}</h3>
                  <p className="text-gray-400">{job.company} · {job.location}</p>
                  <p className="text-gray-500 text-sm mt-1">Posted {job.postedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:flex-row flex-col w-full md:w-auto">
                <div className="flex items-center gap-2 bg-[#4ECCA3]/20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-[#4ECCA3]" />
                  <span className="text-[#4ECCA3] text-sm font-medium">{job.matchScore}% Match</span>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors w-full md:w-auto text-center">
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center gap-3 justify-center">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Looking for more? Try our job search with your resume</span>
          </div>
        </div>
      </div>
    </div>
  );
}