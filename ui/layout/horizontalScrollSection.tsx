"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Title } from "../text/title";
import { Text } from "../text/text";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
  href: string;
};

export default function HorizontalScrollSection({
  children,
  title,
  description,
  backgroundColor = "bg-primary-light/20",
  href,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <div className="mb-4 flex flex-col items-start gap-1">
            <Title variant="h2" className="font-bold">
              {title}
            </Title>
            <Text variant="p">{description}</Text>
          </div>
          <Link
            href={href}
            className="text-primary hover:text-primary-dark text-sm text-start font-medium transition-colors"
          >
            Ver todos
          </Link>
        </div>
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
