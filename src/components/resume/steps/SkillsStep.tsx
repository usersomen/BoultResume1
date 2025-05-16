import React, { useState } from 'react';
import { X, Plus, ChevronDown, ChevronUp, Search, AlertCircle } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface SkillsStepProps {
  resumeData: ResumeData;
  onUpdate: (skills: ResumeData['skills']) => void;
}

// Common skill categories with example skills
const SKILL_CATEGORIES = [
  {
    name: 'Programming Languages',
    examples: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'PHP', 'Swift', 'Kotlin', 'TypeScript']
  },
  {
    name: 'Web Development',
    examples: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'HTML', 'CSS', 'SASS']
  },
  {
    name: 'Database',
    examples: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Firebase', 'Redis', 'Elasticsearch', 'DynamoDB']
  },
  {
    name: 'DevOps & Tools',
    examples: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Jenkins', 'CI/CD', 'Terraform']
  },
  {
    name: 'Data Science',
    examples: ['Machine Learning', 'Data Analysis', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'R', 'Tableau', 'Power BI']
  },
  {
    name: 'Design',
    examples: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Design', 'Wireframing', 'Prototyping']
  },
  {
    name: 'Soft Skills',
    examples: ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability']
  },
  {
    name: 'Project Management',
    examples: ['Agile', 'Scrum', 'Kanban', 'JIRA', 'Trello', 'Microsoft Project', 'Risk Management', 'Budgeting']
  }
];

const SkillsStep: React.FC<SkillsStepProps> = ({
  resumeData,
  onUpdate
}) => {
  const [skills, setSkills] = useState<string[]>(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const handleAddSkill = (skill: string = newSkill) => {
    if (!skill.trim()) return;
    
    // Avoid duplicates
    if (skills.includes(skill.trim())) return;
    
    const updatedSkills = [...skills, skill.trim()];
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
    setNewSkill('');
  };
  
  const handleRemoveSkill = (indexToRemove: number) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToRemove);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };
  
  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  // Filter suggested skills based on search term
  const filteredCategories = SKILL_CATEGORIES.map(category => ({
    ...category,
    examples: category.examples.filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !skills.includes(skill)
    )
  })).filter(category => category.examples.length > 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          List skills that are relevant to your target position. Include both hard skills (technical abilities) and soft skills (interpersonal traits).
        </p>
      </div>
      
      {/* Current Skills */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Your Skills</h3>
        
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="flex items-center bg-[#4ECCA3]/10 text-[#4ECCA3] px-3 py-1.5 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-[#4ECCA3] hover:text-[#45B08C]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg mb-4">
            <p className="text-gray-500">No skills added yet. Add skills below to get started.</p>
          </div>
        )}
      </div>
      
      {/* Add Skills Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add a Skill
        </label>
        <div className="flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Type a skill and press Add"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <button
            onClick={() => handleAddSkill()}
            disabled={!newSkill.trim()}
            className={`px-4 py-2 rounded-r-md ${
              newSkill.trim()
                ? 'bg-[#4ECCA3] text-white hover:bg-[#45B08C]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Skill Suggestions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">Suggested Skills</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="py-1.5 pl-10 pr-3 block border border-gray-300 rounded-md text-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3]"
            />
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg divide-y">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.name} className="overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                >
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  {expandedCategory === category.name ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                
                {expandedCategory === category.name && (
                  <div className="p-4 bg-white">
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((skill, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddSkill(skill)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm flex items-center"
                        >
                          <span>{skill}</span>
                          <Plus className="h-3 w-3 ml-1 text-gray-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : searchTerm ? (
            <div className="p-6 text-center text-gray-500">
              <p>No matching skills found. Try a different search term or add it manually.</p>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No skill suggestions available. Try searching for specific skills.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Skills organization tip */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800 text-sm">Tips for Organizing Skills</h4>
            <ul className="mt-1 text-sm text-yellow-700 pl-5 list-disc space-y-1">
              <li>List the most relevant skills for your target job first</li>
              <li>Include specific technical skills rather than generic ones</li>
              <li>Add proficiency levels only if you can defend them in an interview</li>
              <li>For technical resumes, group skills by category (languages, frameworks, tools)</li>
              <li>Ensure the skills on your resume match keywords from job descriptions</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Additional guidance */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 text-sm mb-2">Skills Section Best Practices</h4>
        <ul className="text-sm text-gray-600 pl-5 list-disc space-y-2">
          <li><strong>Be honest</strong> - Only include skills you're comfortable discussing in an interview</li>
          <li><strong>Be specific</strong> - "JavaScript" and "React" are better than just "Programming"</li>
          <li><strong>Balance technical and soft skills</strong> - Both are important to employers</li>
          <li><strong>Tailor to the job</strong> - Emphasize skills mentioned in the job description</li>
          <li><strong>Quality over quantity</strong> - 10-15 well-chosen skills are better than 30 generic ones</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsStep;
