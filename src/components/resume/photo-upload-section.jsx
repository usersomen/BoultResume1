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
