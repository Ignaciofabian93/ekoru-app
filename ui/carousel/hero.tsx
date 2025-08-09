"use client";
import { useEffect, useState } from "react";
import { banners } from "@/app/feed/mockups/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="relative h-96 md:h-[500px]">
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {banner.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl mb-4 text-white/90">
                      {banner.subtitle}
                    </h2>
                    <p className="text-lg mb-8 text-white/80 max-w-lg">
                      {banner.description}
                    </p>
                    <Link
                      href={banner.href}
                      className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-neutral-light transition-colors duration-200 shadow-lg"
                    >
                      {banner.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        width={200}
                        height={200}
                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentBanner
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
