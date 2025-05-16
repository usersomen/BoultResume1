import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, CreditCard, Shield, Save, Camera, Trash2 } from 'lucide-react';

const tabs = [
  { icon: User, label: 'Profile' },
  { icon: Bell, label: 'Notifications' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Shield, label: 'Privacy' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    notifications: {
      email: true,
      push: true,
      updates: false,
      marketing: true
    },
    privacy: {
      profileVisibility: 'public',
      resumeVisibility: 'private',
      showEmail: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    try {
      // Here you would typically save the data to your backend
      // For now, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message using a toast or alert
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.label
                  ? 'bg-[#4ECCA3] text-white shadow-lg shadow-[#4ECCA3]/20'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {activeTab === 'Profile' && (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-700 group-hover:border-[#4ECCA3] transition-colors duration-300">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-gray-900/80 text-white opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300">
                    <button
                      onClick={handlePhotoClick}
                      className="p-2 hover:bg-[#4ECCA3]/20 rounded-lg transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    {profileImage && (
                      <button
                        onClick={handleRemovePhoto}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Profile Photo</h3>
                  <p className="text-gray-400 text-sm">Upload a new photo or remove the current one</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div>
                    <h3 className="text-gray-300 font-medium">Email Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive email updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4ECCA3]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ECCA3]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div>
                    <h3 className="text-gray-300 font-medium">Push Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive push notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4ECCA3]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ECCA3]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div>
                    <h3 className="text-gray-300 font-medium">Product Updates</h3>
                    <p className="text-gray-400 text-sm">Receive updates about new features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.updates}
                      onChange={() => handleNotificationChange('updates')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4ECCA3]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ECCA3]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Privacy' && (
            <div className="space-y-8">
              <div className="p-4 bg-gray-700/50 rounded-xl">
                <h3 className="text-gray-300 font-medium mb-4">Profile Visibility</h3>
                <div className="space-y-4">
                  <label className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:border-[#4ECCA3]/20 transition-colors duration-300">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="public"
                      checked={formData.privacy.profileVisibility === 'public'}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-4 h-4 text-[#4ECCA3] focus:ring-[#4ECCA3] border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-300 font-medium">Public</span>
                      <span className="block text-gray-400 text-sm">Your profile will be visible to everyone</span>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:border-[#4ECCA3]/20 transition-colors duration-300">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="private"
                      checked={formData.privacy.profileVisibility === 'private'}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-4 h-4 text-[#4ECCA3] focus:ring-[#4ECCA3] border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-300 font-medium">Private</span>
                      <span className="block text-gray-400 text-sm">Only you can see your profile</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex justify-end pt-6 border-t border-gray-700">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-[#4ECCA3] hover:bg-[#45B08C] text-white rounded-xl font-medium transition-colors duration-300 shadow-lg shadow-[#4ECCA3]/20"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}