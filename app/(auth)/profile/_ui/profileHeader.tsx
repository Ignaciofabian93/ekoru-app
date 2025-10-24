import { useState, useEffect } from "react";
import { Calendar, Camera, Edit3, Mail, MapPin, Phone, Shield } from "lucide-react";
import Image from "next/image";
import useCoverImage from "../_hooks/useCoverImage";
import useProfileImage from "../_hooks/useProfileImage";
import ImageViewer from "@/ui/modals/imageViewer";
import useSessionData from "@/hooks/useSessionData";

export default function ProfileHeader() {
  const { displayedName, description, phone, memberSince, isVerified, email, address } = useSessionData();
  const { profileImage, profileInputRef, isProfileImageUploading, handleProfileImageUpload, triggerProfileFileUpload } =
    useProfileImage();
  const { coverImage, isUploading, fileInputRef, handleCoverImageUpload, triggerFileUpload } = useCoverImage();

  const [showImageModal, setShowImageModal] = useState(false);

  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  // Handle body scroll lock and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImageModal();
      }
    };

    if (showImageModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showImageModal]);

  return (
    <section className="relative overflow-hidden">
      {/* Cover Image or Gradient Background with Overlaid Content */}
      <div className="relative h-80 sm:h-96 lg:h-[400px]">
        {coverImage ? (
          <Image src={coverImage} alt="Cover Image" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        )}

        {/* Cover Image Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Cover Image Upload Button */}
        <button
          onClick={triggerFileUpload}
          disabled={isUploading}
          className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white rounded-lg p-3 hover:bg-black/60 transition-colors duration-200 disabled:opacity-50"
          title="Cambiar imagen de portada"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="w-5 h-5" />
          )}
        </button>

        {/* Hidden File Input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverImageUpload} className="hidden" />

        {/* Profile Content Overlaid on Cover Image */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={openImageModal}
                >
                  <Image
                    src={profileImage}
                    alt={displayedName || "Profile Image"}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={triggerProfileFileUpload}
                  disabled={isProfileImageUploading}
                  className="absolute top-0 right-0 bg-black/40 text-white backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-black/60 transition-colors"
                >
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                {/* Hidden File Input */}
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-2 sm:mb-3">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">{displayedName}</h1>
                  {isVerified && (
                    <span className="inline-flex items-center px-2 py-1 sm:px-3 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white flex-shrink-0">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Verificado
                    </span>
                  )}
                </div>
                <p className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {description}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start max-w-md gap-3 sm:gap-4 text-xs sm:text-sm text-white">
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">Miembro desde {memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Modal */}
      <ImageViewer isOpen={showImageModal} onClose={closeImageModal}>
        {/* Large Profile Image */}
        <Image
          src={profileImage}
          alt={displayedName || "Profile Image"}
          fill
          className="object-cover rounded-2xl shadow-2xl"
          sizes="(max-width: 768px) 90vw, 512px"
          priority
        />
      </ImageViewer>
    </section>
  );
}
