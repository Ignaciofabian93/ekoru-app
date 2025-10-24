import { useEffect, useRef, useState } from "react";
import { compressImageClient } from "../_utils/imageCompress";
import useSessionStore from "@/store/session";
import useSessionData from "@/hooks/useSessionData";
import useAlert from "@/hooks/useAlert";

export default function useCoverImage() {
  const { data } = useSessionStore();
  const { notifyError } = useAlert();
  const { backgroundImage } = useSessionData();
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    setCoverImage(backgroundImage);
  }, [backgroundImage]);

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsUploading(true);

    try {
      // Create blob URL for immediate preview
      const blobUrl = URL.createObjectURL(file);
      setCoverImage(blobUrl);

      // Compress image on client side before upload
      const compressedFile = await compressImageClient({ file, maxWidth: 1600, maxHeight: 600 });
      // Upload file and get URL
      const imageUrl = await uploadCoverImage(compressedFile);
      // Update state with permanent URL
      setCoverImage(imageUrl);
    } catch {
      notifyError("Error al subir imagen de portada. Inténtalo de nuevo.");
      setCoverImage(data.profile?.coverImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Function to upload file to storage service
  const uploadCoverImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", data.id);

    const response = await fetch("/api/upload/cover-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      notifyError("Hubo un error al subir la imagen de portada.");
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
    coverImage,
    isUploading,
    fileInputRef,
    handleCoverImageUpload,
    triggerFileUpload,
  };
}
