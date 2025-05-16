import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, AlertCircle, BookOpen, Clock, Award, ChevronRight, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  platform: string;
  url: string;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  completed?: boolean;
}

export default function LearningPath() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Foundations',
      description: 'Master the core concepts and fundamentals',
      courses: [
        {
          id: '1-1',
          title: 'JavaScript Essentials',
          description: 'Learn the fundamentals of JavaScript programming',
          duration: '4 weeks',
          level: 'beginner',
          topics: ['Variables', 'Functions', 'Objects', 'Arrays', 'DOM Manipulation'],
          platform: 'Udemy',
          url: 'https://example.com/course',
          completed: true
        },
        {
          id: '1-2',
          title: 'HTML & CSS Mastery',
          description: 'Build modern and responsive web layouts',
          duration: '3 weeks',
          level: 'beginner',
          topics: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
          platform: 'Coursera',
          url: 'https://example.com/course',
          completed: false
        }
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Frontend Development',
      description: 'Build modern web applications with React',
      courses: [
        {
          id: '2-1',
          title: 'React Fundamentals',
          description: 'Learn the basics of React development',
          duration: '6 weeks',
          level: 'intermediate',
          topics: ['Components', 'Props', 'State', 'Hooks', 'Routing'],
          platform: 'Frontend Masters',
          url: 'https://example.com/course',
          completed: false
        },
        {
          id: '2-2',
          title: 'Advanced React Patterns',
          description: 'Master advanced React concepts and patterns',
          duration: '4 weeks',
          level: 'advanced',
          topics: ['Context', 'HOCs', 'Render Props', 'Performance', 'Testing'],
          platform: 'Egghead',
          url: 'https://example.com/course',
          completed: false
        }
      ],
      completed: false
    }
  ]);

  const toggleCourseCompletion = (moduleId: string, courseId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        const updatedCourses = module.courses.map(course => {
          if (course.id === courseId) {
            return { ...course, completed: !course.completed };
          }
          return course;
        });
        const allCoursesCompleted = updatedCourses.every(course => course.completed);
        return { ...module, courses: updatedCourses, completed: allCoursesCompleted };
      }
      return module;
    }));
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Learning Path
          </h2>
          <p className="text-gray-600 mb-8">
            Follow a structured learning path to achieve your career goals
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
            <p className="text-gray-600">Loading your learning path...</p>
          </div>
        )}

        {/* Modules */}
        <div className="space-y-8">
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Module Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                  {module.completed && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Courses */}
              <div className="divide-y divide-gray-200">
                {module.courses.map((course, courseIndex) => (
                  <div
                    key={course.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      {/* Course Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            {course.title}
                          </h4>
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium
                            ${course.level === 'beginner' ? 'bg-green-100 text-green-600' : ''}
                            ${course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' : ''}
                            ${course.level === 'advanced' ? 'bg-red-100 text-red-600' : ''}
                          `}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{course.description}</p>

                        {/* Course Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm">{course.platform}</span>
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2">
                          {course.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-4">
                        <motion.button
                          onClick={() => toggleCourseCompletion(module.id, course.id)}
                          className={`p-2 rounded-lg transition-colors
                            ${course.completed
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.button>
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                        >
                          <span className="text-sm font-medium">Start Course</span>
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 