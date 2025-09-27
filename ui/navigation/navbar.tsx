"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Menu } from "lucide-react";
import { useCatalogStore } from "@/store/catalog";
import Image from "next/image";
import Link from "next/link";
import Subheader from "./subheader";
import useSessionStore from "@/store/session";
import AccountMenu from "./account";
import SideMobileMenu from "./sideMobileMenu";
import clsx from "clsx";
import Input from "../inputs/input";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { marketData } = useCatalogStore();
  const { data } = useSessionStore();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Mobile accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDepartment, setOpenDepartment] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
    // Reset nested accordions when switching main sections
    if (openAccordion !== section) {
      setOpenDepartment(null);
      setOpenCategory(null);
    }
  };

  const toggleDepartment = (departmentId: number) => {
    setOpenDepartment(openDepartment === departmentId ? null : departmentId);
    setOpenCategory(null); // Reset category when switching departments
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <header
        className={clsx(
          "bg-gradient-to-r from-navbar-light-950 via-navbar-light-600 to-navbar-light-950",
          "dark:from-navbar-dark-950 dark:via-navbar-dark-700 dark:to-navbar-dark-950",
          "shadow-md border-b border-neutral/20",
          "sticky top-0 z-50"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/feed" className="flex items-center">
                <Image
                  src="/brand/logo.webp"
                  alt="EKORU"
                  width={100}
                  height={50}
                  className="h-full max-h-[50px] w-auto drop-shadow-xs drop-shadow-slate-900/20"
                />
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <Input
                name="search"
                type="search"
                placeholder="Buscar en EKORU..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                icon={Search}
                className="m-0"
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Favorites */}
              <Link
                href="/profile/favorites"
                className="p-2 text-white hover:text-primary transition-colors duration-200"
                aria-label="Favorites"
              >
                <Heart className="h-6 w-6" />
              </Link>

              {/* Shopping Cart */}
              {/* Change back to Link when enabling Cart */}
              <div
                // href="/cart"
                // className="relative p-2 text-white hover:text-primary transition-colors duration-200"
                className="relative p-2 text-white opacity-50"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {/* <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span> */}
              </div>

              {/* User Account */}
              <AccountMenu isLoggedIn={!!data?.id} />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-primary transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <Input
              name="search"
              type="search"
              placeholder="Buscar en EKORU..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              icon={Search}
              className="m-0"
            />
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
            {/* Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <SideMobileMenu
              closeMobileMenu={closeMobileMenu}
              openAccordion={openAccordion}
              toggleAccordion={toggleAccordion}
              marketData={Array.isArray(marketData) ? { marketCatalog: marketData } : marketData}
              openDepartment={openDepartment}
              toggleDepartment={toggleDepartment}
              openCategory={openCategory}
              toggleCategory={toggleCategory}
              isLoggedIn={!!data?.id}
              data={data ?? null}
            />
          </div>
        )}
      </AnimatePresence>

      <Subheader />
    </>
  );
}
