"use client";

import { getImageUrl } from "@/utils/imageUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  productName: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
};

export default function ImageGallery({ images, productName, selectedImage, setSelectedImage }: Props) {
  const [imageError, setImageError] = useState(false);
  const imageUrls = images.map((img) => getImageUrl(img));

  const goToPrevious = () => {
    setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-neutral-100 dark:bg-stone-700 rounded-xl overflow-hidden group">
        {!imageError ? (
          <Image
            src={imageUrls[selectedImage] || "/placeholder.svg"}
            alt={`${productName} - Imagen ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-stone-500">
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-700 dark:text-stone-300" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6 text-neutral-700 dark:text-stone-300" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent hover:border-neutral-300 dark:hover:border-stone-600"
              }`}
            >
              <Image
                src={getImageUrl(img)}
                alt={`${productName} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
