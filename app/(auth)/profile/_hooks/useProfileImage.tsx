import { useEffect, useRef, useState } from "react";
import { compressImageClient } from "../_utils/imageCompress";
import useSessionStore from "@/store/session";
import useSessionData from "@/hooks/useSessionData";
import useAlert from "@/hooks/useAlert";

export default function useProfileImage() {
  const { data } = useSessionStore();
  const { sellerImage } = useSessionData();
  const { notifyError } = useAlert();
  const [profileImage, setProfileImage] = useState<string>("/brand/icon.webp");
  const [backupImage, setBackupImage] = useState<string>("/brand/icon.webp");

  useEffect(() => {
    setProfileImage(sellerImage);
    setBackupImage(sellerImage);
  }, [sellerImage]);

  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      notifyError("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    // Validate file size (max 10MB for original file)
    if (file.size > 10 * 1024 * 1024) {
      notifyError("El archivo debe ser menor a 10MB.");
      return;
    }

    setIsProfileImageUploading(true);

    try {
      // Create blob URL for immediate preview
      const blobUrl = URL.createObjectURL(file);
      setProfileImage(blobUrl);

      // Compress image on client side before upload
      const compressedFile = await compressImageClient({ file, maxWidth: 800, maxHeight: 800 });

      // Upload compressed file and get URL
      const imageUrl = await uploadProfileImage(compressedFile);
      // Update state with permanent URL
      setProfileImage(imageUrl);
    } catch {
      notifyError("Error al subir imagen de perfil. Inténtalo de nuevo.");
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
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      notifyError("Hubo un error al subir la imagen de perfil.");
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (!result.imageUrl) {
      notifyError("No se recibió respuesta del servidor.");
      throw new Error("No se recibió URL de la imagen del servidor");
    }

    return result.imageUrl;
  };

  return {
    profileImage,
    isProfileImageUploading,
    profileInputRef,
    handleProfileImageUpload,
    triggerProfileFileUpload,
  };
}
