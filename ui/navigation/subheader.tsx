"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { subnavigationLinks } from "@/constants/navigation/data";
import clsx from "clsx";
import Link from "next/link";
import MegaMenu from "./megaMenu";

export default function Subheader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (title: string) => {
    if (
      ["Mercado", "Tiendas", "Servicios", "Comunidad", "Blog"].includes(title)
    ) {
      setActiveDropdown(title);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Delay closing to allow navigation to mega menu
    setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
      }
    }, 100);
  };

  const handleMegaMenuClose = () => {
    setActiveDropdown(null);
    setIsHovering(false);
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          "hidden lg:flex w-full bg-white",
          "shadow-md border-b border-neutral/20",
          "sticky top-[64px] z-40",
          "h-10 flex items-center justify-center",
          "text-sm font-medium"
        )}
        onMouseLeave={handleMouseLeave}
      >
        {subnavigationLinks.map((link) => (
          <div key={link.title} className="relative">
            {["Mercado", "Tiendas", "Servicios", "Comunidad", "Blog"].includes(
              link.title
            ) ? (
              <button
                onMouseEnter={() => handleMouseEnter(link.title)}
                className={clsx(
                  "block px-4 py-2 text-text-primary hover:text-primary transition-colors duration-200",
                  activeDropdown === link.title && "text-primary bg-primary/5"
                )}
              >
                {link.title}
              </button>
            ) : (
              <Link
                href={link.href}
                className="block px-4 py-2 text-text-primary hover:text-primary hover:bg-neutral-light transition-colors"
              >
                {link.title}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeDropdown && (
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <MegaMenu
              activeTab={activeDropdown}
              onClose={handleMegaMenuClose}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
