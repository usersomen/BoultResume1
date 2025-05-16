$content = Get-Content -Path 'C:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx' -Raw

# Add state variables for the image cropper
$content = $content -replace 'const \[profilePhoto, setProfilePhoto\] = useState<string \| null>\(null\);', 'const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);'

# Update the handleFileChange function and add crop handling functions
$content = $content -replace 'const handleFileChange = \(event: React\.ChangeEvent<HTMLInputElement>\) => \{(\r?\n.*?){2,8}reader\.readAsDataURL\(file\);\r?\n\s+\}\r?\n\s+\};', @'
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Instead of setting the profile photo directly, set the temp image and show cropper
        setTempImageSrc(reader.result as string);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const handleCropComplete = (croppedImageUrl: string) => {
    setProfilePhoto(croppedImageUrl);
    setCropperVisible(false);
    setTempImageSrc(null);
  };

  // Handle crop cancellation
  const handleCropCancel = () => {
    setCropperVisible(false);
    setTempImageSrc(null);
  };
'@

# Replace the photo upload section with PhotoUploader component
$content = $content -replace '{/\* Photo Upload \*/}(\r?\n.*?){25,30}onChange=\{handleFileChange\} \r?\n\s+/>\r?\n\s+</div>', @'
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

# Write the updated content back to the file
$content | Set-Content -Path 'C:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx'
