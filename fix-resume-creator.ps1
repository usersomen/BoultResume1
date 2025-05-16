# Read the original file content
$content = Get-Content -Path 'C:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx' -Raw

# 1. Fix imports
$content = $content -replace 'import AIWritingAssistant from ''./AIWritingAssistant'';\nimport PhotoUploader from ''./PhotoUploader'';\nimport ImageCropper from ''../common/ImageCropper'';', 'import AIWritingAssistant from ''./AIWritingAssistant'';
import PhotoUploader from ''./PhotoUploader'';
import ImageCropper from ''../common/ImageCropper'';'

# 2. Fix state variables
$content = $content -replace 'const \[profilePhoto, setProfilePhoto\] = useState<string \| null>\(null\);\n  const \[cropperVisible, setCropperVisible\] = useState<boolean>\(false\);\n  const \[tempImageSrc, setTempImageSrc\] = useState<string \| null>\(null\);', 'const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);'

# 3. Replace the photo upload section
$photoUploadPattern = @'
              {/* Photo Upload */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
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
                  onChange={handleFileChange} 
                />
              </div>
'@

$photoUploadReplacement = @'
              {/* Photo Upload */}
              <div className="flex items-center space-x-4">
                <PhotoUploader
                  profilePhoto={profilePhoto}
                  onPhotoChange={(photoUrl) => setProfilePhoto(photoUrl)}
                />
              </div>
              
              {/* Image Cropper Modal */}
              {cropperVisible && tempImageSrc && (
                <ImageCropper
                  imageSrc={tempImageSrc}
                  onCropComplete={handleCropComplete}
                  onCancel={handleCropCancel}
                  aspectRatio={1}
                />
              )}
'@

$content = $content -replace [regex]::Escape($photoUploadPattern), $photoUploadReplacement

# Write the updated content back to the file
$content | Set-Content -Path 'C:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx'

Write-Host "ResumeCreator.tsx has been updated successfully!"
