import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter } from 'lucide-react';
import { ResumeData } from '../../../types/resume';

interface PersonalInfoStepProps {
  resumeData: ResumeData;
  onUpdate: (personalInfo: ResumeData['personalInfo']) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  resumeData,
  onUpdate
}) => {
  const [personalInfo, setPersonalInfo] = useState<ResumeData['personalInfo']>(
    resumeData.personalInfo || {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      twitter: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update parent component after a short delay
    setTimeout(() => {
      onUpdate(personalInfo);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#4ECCA3]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          Your contact information is the most important part of your resume. Recruiters need to know who you are and how to reach you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Fields */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h4 className="font-medium text-gray-700">Required Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Optional Fields */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Additional Contact Information</h4>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={personalInfo.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Online Presence */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Online Presence</h4>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website/Portfolio</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="website"
                  value={personalInfo.website}
                  onChange={handleChange}
                  placeholder="www.johndoe.com"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="linkedin"
                  value={personalInfo.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/johndoe"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="github"
                  value={personalInfo.github}
                  onChange={handleChange}
                  placeholder="github.com/johndoe"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Twitter className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="twitter"
                  value={personalInfo.twitter}
                  onChange={handleChange}
                  placeholder="twitter.com/johndoe"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4ECCA3] focus:border-[#4ECCA3] sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <h4 className="font-medium text-yellow-800 text-sm mb-2">Best Practices</h4>
        <ul className="text-sm text-yellow-700 pl-5 list-disc space-y-1">
          <li>Use a professional email address, preferably with your name</li>
          <li>Include only one phone number where you can be easily reached</li>
          <li>For location, city and state/country is sufficient (no need for full address)</li>
          <li>Only include social profiles that are professional and up-to-date</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
