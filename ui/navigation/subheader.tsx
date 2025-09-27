"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { subnavigationLinks } from "@/constants/navigation/data";
import { useCatalogStore } from "@/store/catalog";
import clsx from "clsx";
import MegaMenu from "./megaMenu";

export default function Subheader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { marketData, storeData } = useCatalogStore();

  const handleClick = (title: string) => {
    if (["Mercado", "Tiendas", "Servicios", "Comunidad", "Blog"].includes(title)) {
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

  return (
    <section className="relative">
      <div
        className={clsx(
          "hidden lg:flex w-full bg-white",
          "shadow-md border-b border-neutral/20",
          "sticky top-[64px] z-40",
          "h-10 flex items-center justify-center",
          "text-sm font-medium",
          "dark:bg-subheader-dark-950 dark:text-text-100 dark:border-subheader-dark-800"
        )}
      >
        {subnavigationLinks.map(({ title, enabled }) => (
          <div key={title} className="relative">
            <button
              onClick={() => handleClick(title)}
              disabled={!enabled}
              className={clsx(
                "block px-4 py-2 transition-colors duration-200",
                activeDropdown === title && "text-primary bg-primary/20",
                {
                  "opacity-50 cursor-not-allowed": !enabled,
                  "hover:text-primary": enabled,
                }
              )}
            >
              {title}
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeDropdown && (
          <div onMouseEnter={handleMegaMenuMouseEnter} onMouseLeave={handleMegaMenuMouseLeave}>
            <MegaMenu
              activeTab={activeDropdown}
              onClose={handleMegaMenuClose}
              marketData={Array.isArray(marketData) ? { marketCatalog: marketData } : marketData}
              storeData={Array.isArray(storeData) ? { storeCatalog: storeData } : storeData}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
