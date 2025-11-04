"use client";
import { useEffect, useState } from "react";
import { banners } from "@/app/feed/mockups/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeroCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentBanner
                ? "translate-x-0"
                : index < currentBanner
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className={`${banner.bgColor} h-full flex items-center`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 sm:py-6 md:py-6 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8 items-center h-full">
                  <div className="text-white text-center lg:text-left">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4 leading-tight">
                      {banner.title}
                    </h1>
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-white/90">
                      {banner.subtitle}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-4 md:mb-6 lg:mb-8 text-white/80 max-w-lg mx-auto lg:mx-0 line-clamp-3">
                      {banner.description}
                    </p>
                    {/* CTA removed - using mock data */}
                    <div className="text-xs sm:text-sm text-white/60 italic">Pronto...</div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 lg:mt-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        width={200}
                        height={200}
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevBanner}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
        aria-label="Next banner"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
              index === currentBanner ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
