import {
  Calendar,
  Camera,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Shield,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import useCoverImage from "../_hooks/useCoverImage";
import useProfileImage from "../_hooks/useProfileImage";
import usePersonalInfo from "../_hooks/usePersonalInfo";

export default function ProfileHeader() {
  const { username, bio, location, email, phone, memberSince, isVerified } =
    usePersonalInfo();
  const {
    profileImage,
    profileInputRef,
    isProfileImageUploading,
    handleProfileImageUpload,
    triggerProfileFileUpload,
  } = useProfileImage();
  const {
    coverImage,
    isUploading,
    fileInputRef,
    handleCoverImageUpload,
    triggerFileUpload,
  } = useCoverImage();

  const [showImageModal, setShowImageModal] = useState(false);

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);

  console.log("cover image:: ", coverImage);

  return (
    <section className="relative overflow-hidden">
      {/* Cover Image or Gradient Background with Overlaid Content */}
      <div className="relative h-80 sm:h-96 lg:h-[400px]">
        {coverImage ? (
          <Image
            src={coverImage}
            alt="Cover Image"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        )}

        {/* Cover Image Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Cover Image Upload Button */}
        <button
          onClick={triggerFileUpload}
          disabled={isUploading}
          className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur-sm text-white rounded-lg p-3 hover:bg-black/60 transition-colors duration-200 disabled:opacity-50"
          title="Cambiar imagen de portada"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="w-5 h-5" />
          )}
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverImageUpload}
          className="hidden"
        />

        {/* Profile Content Overlaid on Cover Image */}
        <div className="absolute inset-0 z-20 flex items-center">
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
                    alt={username || "Profile Image"}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={triggerProfileFileUpload}
                  disabled={isProfileImageUploading}
                  className="absolute top-0 right-0 bg-black/40 text-white backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-black/60 transition-colors z-10"
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
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                    {username}
                  </h1>
                  {isVerified && (
                    <span className="inline-flex items-center px-2 py-1 sm:px-3 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white flex-shrink-0">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Verificado
                    </span>
                  )}
                </div>
                <p className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {bio}
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
                    <span className="truncate">{location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      Miembro desde {memberSince}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
                <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors duration-200 border border-white/30 text-sm sm:text-base">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Notificaciones
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeImageModal}
        >
          <div className="relative max-w-2xl max-h-[80vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-60 bg-black/40 backdrop-blur-sm text-white rounded-full p-3 hover:bg-black/60 transition-colors duration-200"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Large Profile Image */}
            <div className="relative w-full h-full max-w-md max-h-md aspect-square animate-in zoom-in duration-300">
              <Image
                src={profileImage}
                alt={username || "Profile Image"}
                fill
                className="object-cover rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 90vw, 512px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
