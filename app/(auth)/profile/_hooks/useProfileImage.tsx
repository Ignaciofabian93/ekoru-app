import { useEffect, useRef, useState } from "react";
import useSessionStore from "@/store/session";
import useSessionData from "@/hooks/useSessionData";

export default function useProfileImage() {
  const { data } = useSessionStore();
  const { sellerImage } = useSessionData();
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
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    // Validate file size (max 10MB for original file)
    if (file.size > 10 * 1024 * 1024) {
      alert("El archivo debe ser menor a 10MB.");
      return;
    }

    setIsProfileImageUploading(true);

    try {
      // Create blob URL for immediate preview
      const blobUrl = URL.createObjectURL(file);
      setProfileImage(blobUrl);

      // Compress image on client side before upload
      const compressedFile = await compressImageClient(file);
      
      // Upload compressed file and get URL
      const imageUrl = await uploadProfileImage(compressedFile);
      // Update state with permanent URL
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      alert(`Error al subir la imagen: ${errorMessage}`);
      setProfileImage(backupImage);
    } finally {
      setIsProfileImageUploading(false);
    }
  };

  const triggerProfileFileUpload = () => {
    profileInputRef.current?.click();
  };

  // Function to compress image on client side
  const compressImageClient = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          if (!ctx) {
            reject(new Error("No se pudo crear el contexto del canvas"));
            return;
          }

          // Set max dimensions for profile image (800x800)
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Error al comprimir la imagen"));
                return;
              }
              // Create new file from blob
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.85 // 85% quality
          );
        };
        img.onerror = () => reject(new Error("Error al cargar la imagen"));
      };
      reader.onerror = () => reject(new Error("Error al leer el archivo"));
    });
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
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    if (!result.imageUrl) {
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
