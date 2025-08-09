"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

type CardImageCarouselProps = {
  images: Array<{ src: string; alt: string }>;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
};

// Single Image Component
export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

// Image Carousel Component
export function CardImageCarousel({
  images,
  className,
  aspectRatio = "video",
}: CardImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "wide":
        return "aspect-[21/9]";
      default:
        return "aspect-video";
    }
  };

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div
        className={clsx(
          "relative overflow-hidden",
          getAspectRatioClass(),
          className
        )}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative overflow-hidden group",
        getAspectRatioClass(),
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className={clsx(
          "absolute left-2 top-1/2 -translate-y-1/2 z-10",
          "bg-black/50 hover:bg-black/70 text-white rounded-full p-2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "hover:scale-110 transition-transform"
        )}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextImage}
        className={clsx(
          "absolute right-2 top-1/2 -translate-y-1/2 z-10",
          "bg-black/50 hover:bg-black/70 text-white rounded-full p-2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "hover:scale-110 transition-transform"
        )}
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              "w-2 h-2 rounded-full transition-all duration-200",
              currentIndex === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
