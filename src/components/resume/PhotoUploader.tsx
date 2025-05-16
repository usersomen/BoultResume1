import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface PhotoUploaderProps {
  profilePhoto: string | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ profilePhoto, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger the file input click
  const handlePhotoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">
            <Upload className="h-6 w-6" />
          </div>
        )}
      </div>
      <button 
        onClick={handlePhotoUpload} 
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        Upload photo
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={onFileSelect} 
      />
    </div>
  );
};

export default PhotoUploader;
