"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  ChevronDown,
} from "lucide-react";
import Subheader from "./subheader";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Categories", href: "/departments" },
    { name: "Stores", href: "/stores" },
    { name: "Blog", href: "/posts" },
    { name: "Community", href: "/community" },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-white via-primary to-primary-dark shadow-md border-b border-neutral/20 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/brand/logo.webp"
                  alt="EKORU"
                  width={100}
                  height={50}
                  className="h-full max-h-[50px] w-auto"
                />
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral" />
                </div>
                <input
                  type="search"
                  placeholder="Buscar en EKORU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral/30 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         text-text-primary placeholder-text-muted bg-white"
                />
              </div>
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
              <Link
                href="/cart"
                className="relative p-2 text-white hover:text-primary transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* User Account */}
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2 text-white hover:text-primary transition-colors duration-200">
                  <UserRound className="h-6 w-6" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile/orders"
                      className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/profile/impact-dashboard"
                      className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
                    >
                      Impact Dashboard
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
                    >
                      Settings
                    </Link>
                    <hr className="my-2 border-neutral/20" />
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>

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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral" />
              </div>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-neutral/30 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       text-text-primary placeholder-text-muted bg-white"
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral/20"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-text-primary hover:bg-neutral-light hover:text-primary transition-colors duration-200 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </header>
      <Subheader />
    </>
  );
}
