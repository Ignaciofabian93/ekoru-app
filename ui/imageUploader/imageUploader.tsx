import { useState } from "react";
import { motion } from "motion/react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Text } from "../text/text";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  images: (File | string)[];
  onImagesChange: (images: (File | string)[]) => void;
  maxImages?: number;
  isSubmitting?: boolean;
};

export default function ImageUploader({ images, onImagesChange, maxImages = 3, isSubmitting = false }: Props) {
  const [draggedOver, setDraggedOver] = useState<number | null>(null);

  const handleFileSelect = (file: File, index: number) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona solo archivos de imagen válidos.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("El archivo debe ser menor a 10MB.");
      return;
    }

    const newImages = [...images];
    newImages[index] = file;
    onImagesChange(newImages);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOver(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file, index);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = "";
    onImagesChange(newImages);
  };

  const getImageUrl = (image: File | string): string => {
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Imágenes del Producto *
        <br />
        (Mínimo 1, Máximo {maxImages})
      </label>
      <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mb-3 block">
        Las imágenes se enviarán cuando envíes el formulario
      </Text>

      {/* Image Upload Containers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: maxImages }).map((_, index) => {
          const image = images[index];
          const hasImage = image && image !== "";

          return (
            <div key={index} className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileSelect(file, index);
                  }
                }}
                className="hidden"
                id={`image-upload-${index}`}
                disabled={isSubmitting}
              />

              {hasImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600"
                >
                  <Image src={getImageUrl(image)} alt={`Imagen ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    disabled={isSubmitting}
                    className={clsx(
                      "absolute top-2 right-2 p-1.5 rounded-full",
                      "bg-red-500 text-white shadow-lg",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      "hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    aria-label={`Eliminar imagen ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded-md shadow-md">
                      Principal
                    </div>
                  )}
                </motion.div>
              ) : (
                <label
                  htmlFor={`image-upload-${index}`}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  className={clsx(
                    "flex flex-col items-center justify-center aspect-square rounded-lg cursor-pointer",
                    "border-2 border-dashed transition-all duration-200",
                    draggedOver === index
                      ? "border-primary bg-primary/20 dark:bg-primary/30"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50",
                    "hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex flex-col items-center gap-2 p-4">
                    {draggedOver === index ? (
                      <Upload className="w-8 h-8 text-primary" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                    <Text variant="span" className="text-xs text-center text-gray-600 dark:text-gray-400">
                      {draggedOver === index ? (
                        "Suelta aquí"
                      ) : (
                        <>
                          Imagen {index + 1}
                          <br />
                          Arrastra o haz clic
                        </>
                      )}
                    </Text>
                    {index === 0 && !hasImage && (
                      <Text variant="span" className="text-xs text-primary font-medium">
                        Principal *
                      </Text>
                    )}
                  </div>
                </label>
              )}
            </div>
          );
        })}
      </div>

      <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
        {images.filter((img) => img && img !== "").length}/{maxImages} imágenes agregadas
      </Text>
    </motion.div>
  );
}
