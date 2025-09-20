import { useEffect, useRef, useState } from "react";
import useSessionStore from "@/store/session";

export default function useProfileImage() {
  const { data } = useSessionStore();
  const [profileImage, setProfileImage] = useState<string>("/brand/icon.webp");
  const [backupImage, setBackupImage] = useState<string>("/brand/icon.webp");

  const defaultLogo = "/brand/icon.webp";

  useEffect(() => {
    if (data.profile?.__typename === "PersonProfile") {
      setProfileImage(data.profile?.profileImage || defaultLogo);
      setBackupImage(data.profile?.profileImage || defaultLogo);
    } else if (data.profile?.__typename === "StoreProfile") {
      setProfileImage(data.profile?.logo || defaultLogo);
      setBackupImage(data.profile?.logo || defaultLogo);
    } else if (data.profile?.__typename === "ServiceProfile") {
      setProfileImage(data.profile?.logo || defaultLogo);
      setBackupImage(data.profile?.logo || defaultLogo);
    } else {
      setProfileImage(defaultLogo);
    }
  }, [data.profile]);

  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo debe ser menor a 5MB.");
      return;
    }

    setIsProfileImageUploading(true);

    try {
      // Create blob URL for immediate preview
      const blobUrl = URL.createObjectURL(file);
      setProfileImage(blobUrl);

      // Upload file and get URL
      const imageUrl = await uploadProfileImage(file);
      // Update state with permanent URL
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Error al subir la imagen. Inténtalo de nuevo.");
      setProfileImage(backupImage);
    } finally {
      setIsProfileImageUploading(false);
    }
  };

  const triggerProfileFileUpload = () => {
    profileInputRef.current?.click();
  };

  // Function to upload file to storage service
  const uploadProfileImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", data.id);

    const response = await fetch("/api/upload/profile-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload profile image");
    }

    const { imageUrl } = await response.json();
    return imageUrl;
  };

  return {
    profileImage,
    isProfileImageUploading,
    profileInputRef,
    handleProfileImageUpload,
    triggerProfileFileUpload,
  };
}
