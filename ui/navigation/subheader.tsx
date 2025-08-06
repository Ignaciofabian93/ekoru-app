"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { subnavigationLinks } from "@/constants/navigation/data";
import clsx from "clsx";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MegaMenu from "./megaMenu";
import MobileMegaMenu from "./mobileMegaMenu";

export default function Subheader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = (title: string) => {
    if (
      ["Mercado", "Tiendas", "Servicios", "Comunidad", "Blog"].includes(title)
    ) {
      // Toggle dropdown: close if same item clicked, open if different item
      setActiveDropdown(activeDropdown === title ? null : title);
      setIsHovering(true);
    }
  };

  const handleMegaMenuMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMegaMenuMouseLeave = () => {
    setIsHovering(false);
    // Close dropdown when mouse leaves mega menu area
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop Subheader */}
      <div
        className={clsx(
          "hidden lg:flex w-full bg-white",
          "shadow-md border-b border-neutral/20",
          "sticky top-[64px] z-40",
          "h-10 flex items-center justify-center",
          "text-sm font-medium"
        )}
      >
        {subnavigationLinks.map((link) => (
          <div key={link.title} className="relative">
            {["Mercado", "Tiendas", "Servicios", "Comunidad", "Blog"].includes(
              link.title
            ) ? (
              <button
                onClick={() => handleClick(link.title)}
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

      {/* Mobile Subheader */}
      <div className="lg:hidden bg-white border-b border-neutral/20 sticky top-[64px] z-40">
        <div className="flex items-center justify-between px-4 h-12">
          <span className="text-sm font-medium text-text-primary">
            Categorías
          </span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-neutral hover:text-primary transition-colors duration-200"
            aria-label="Toggle categories menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {activeDropdown && (
          <div
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            <MegaMenu
              activeTab={activeDropdown}
              onClose={handleMegaMenuClose}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Mega Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMegaMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        )}
      </AnimatePresence>
    </div>
  );
}
