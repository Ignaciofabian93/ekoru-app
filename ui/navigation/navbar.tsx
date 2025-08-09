"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  ChevronDown,
  ChevronRight,
  Package,
  Store,
  Wrench,
  Users,
  BookOpen,
} from "lucide-react";
import {
  marketplaceDepartments,
  storeCategories,
  serviceCategories,
} from "@/constants/navigation/data";
import Image from "next/image";
import Link from "next/link";
import Subheader from "./subheader";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mobile accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDepartment, setOpenDepartment] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
    // Reset nested accordions when switching main sections
    if (openAccordion !== section) {
      setOpenDepartment(null);
      setOpenCategory(null);
    }
  };

  const toggleDepartment = (departmentId: string) => {
    setOpenDepartment(openDepartment === departmentId ? null : departmentId);
    setOpenCategory(null); // Reset category when switching departments
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-primary-light via-primary to-primary-dark shadow-md border-b border-neutral/20 sticky top-0 z-50">
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
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[70%] max-w-sm h-full bg-white shadow-2xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral/20 bg-gradient-to-r from-primary/5 to-primary-dark/5">
                <h2 className="text-lg font-semibold text-text-primary">
                  Menú
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/10"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Menu Content */}
              <div className="h-full overflow-y-auto pb-20">
                {/* User Section */}
                <div className="p-4 border-b border-neutral/10 bg-neutral-light/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <UserRound className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Mi Cuenta</p>
                      <p className="text-sm text-text-muted">
                        Gestiona tu perfil
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-white hover:text-primary transition-colors rounded-lg"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/profile/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-white hover:text-primary transition-colors rounded-lg"
                    >
                      Mis Pedidos
                    </Link>
                    <Link
                      href="/profile/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-white hover:text-primary transition-colors rounded-lg"
                    >
                      Favoritos
                    </Link>
                    <Link
                      href="/profile/impact-dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-white hover:text-primary transition-colors rounded-lg"
                    >
                      Dashboard de Impacto
                    </Link>
                  </div>
                </div>

                {/* Navigation Links with Accordion */}
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Navegación
                  </h3>

                  {/* Mercado Accordion */}
                  <div className="border-b border-neutral/10 last:border-b-0">
                    <button
                      onClick={() => toggleAccordion("mercado")}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
                    >
                      <div className="flex items-center">
                        <Package className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium text-text-primary">
                          Mercado
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openAccordion === "mercado" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === "mercado" && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                        >
                          {marketplaceDepartments.map((department) => (
                            <div
                              key={department.id}
                              className="border-b border-neutral/5 last:border-b-0"
                            >
                              <button
                                onClick={() => toggleDepartment(department.id)}
                                className="w-full flex items-center justify-between p-2 pl-6 text-left hover:bg-white/50 transition-colors"
                              >
                                <span className="text-sm text-text-secondary">
                                  {department.title}
                                </span>
                                <ChevronRight
                                  className={`h-3 w-3 text-neutral transition-transform duration-200 ${
                                    openDepartment === department.id
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {openDepartment === department.id && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-white/30"
                                  >
                                    {department.categories.map((category) => (
                                      <div key={category.id}>
                                        <button
                                          onClick={() =>
                                            toggleCategory(category.id)
                                          }
                                          className="w-full flex items-center justify-between p-2 pl-10 text-left hover:bg-white/50 transition-colors"
                                        >
                                          <span className="text-xs text-text-muted">
                                            {category.title}
                                          </span>
                                          <ChevronRight
                                            className={`h-3 w-3 text-neutral transition-transform duration-200 ${
                                              openCategory === category.id
                                                ? "rotate-90"
                                                : ""
                                            }`}
                                          />
                                        </button>

                                        <AnimatePresence>
                                          {openCategory === category.id && (
                                            <motion.div
                                              initial={{ height: 0 }}
                                              animate={{ height: "auto" }}
                                              exit={{ height: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden bg-white/50"
                                            >
                                              {category.subcategories.map(
                                                (subcategory) => (
                                                  <Link
                                                    key={subcategory.id}
                                                    href={subcategory.href}
                                                    onClick={() =>
                                                      setIsMobileMenuOpen(false)
                                                    }
                                                    className="block p-2 pl-14 text-xs text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
                                                  >
                                                    {subcategory.title}
                                                  </Link>
                                                )
                                              )}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tiendas Accordion */}
                  <div className="border-b border-neutral/10 last:border-b-0">
                    <button
                      onClick={() => toggleAccordion("tiendas")}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
                    >
                      <div className="flex items-center">
                        <Store className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium text-text-primary">
                          Tiendas
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openAccordion === "tiendas" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === "tiendas" && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                        >
                          {storeCategories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/stores?category=${category.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block p-3 pl-6 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                            >
                              <h4 className="text-sm font-medium text-text-secondary mb-1">
                                {category.title}
                              </h4>
                              <p className="text-xs text-text-muted">
                                {category.description}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Servicios Accordion */}
                  <div className="border-b border-neutral/10 last:border-b-0">
                    <button
                      onClick={() => toggleAccordion("servicios")}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
                    >
                      <div className="flex items-center">
                        <Wrench className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium text-text-primary">
                          Servicios
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openAccordion === "servicios" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === "servicios" && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                        >
                          {serviceCategories.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services?category=${service.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block p-3 pl-6 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                            >
                              <h4 className="text-sm font-medium text-text-secondary mb-1">
                                {service.title}
                              </h4>
                              <p className="text-xs text-text-muted">
                                {service.description}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Comunidad Accordion */}
                  <div className="border-b border-neutral/10 last:border-b-0">
                    <button
                      onClick={() => toggleAccordion("comunidad")}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
                    >
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium text-text-primary">
                          Comunidad
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openAccordion === "comunidad" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === "comunidad" && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                        >
                          <Link
                            href="/community/forums"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Foros
                            </h4>
                            <p className="text-xs text-text-muted">
                              Discute temas ambientales
                            </p>
                          </Link>
                          <Link
                            href="/community/events"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Eventos
                            </h4>
                            <p className="text-xs text-text-muted">
                              Actividades ecológicas
                            </p>
                          </Link>
                          <Link
                            href="/community/groups"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Grupos
                            </h4>
                            <p className="text-xs text-text-muted">
                              Únete a comunidades
                            </p>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Blog Accordion */}
                  <div>
                    <button
                      onClick={() => toggleAccordion("blog")}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium text-text-primary">
                          Blog
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openAccordion === "blog" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === "blog" && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                        >
                          <Link
                            href="/blog/sustainability"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Sostenibilidad
                            </h4>
                            <p className="text-xs text-text-muted">
                              Guías y consejos
                            </p>
                          </Link>
                          <Link
                            href="/blog/reviews"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Reviews
                            </h4>
                            <p className="text-xs text-text-muted">
                              Análisis de productos
                            </p>
                          </Link>
                          <Link
                            href="/blog/news"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-3 pl-6 hover:bg-white/50 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-text-secondary mb-1">
                              Noticias
                            </h4>
                            <p className="text-xs text-text-muted">
                              Actualidad ambiental
                            </p>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-neutral/10">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Acciones Rápidas
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 text-text-primary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg border border-neutral/20"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-3 text-primary" />
                        <span>Carrito de Compras</span>
                      </div>
                      <span className="bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        3
                      </span>
                    </Link>
                    <Link
                      href="/profile/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-3 text-text-primary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg border border-neutral/20"
                    >
                      <Heart className="h-5 w-5 mr-3 text-primary" />
                      <span>Lista de Deseos</span>
                    </Link>
                  </div>
                </div>

                {/* Settings & Support */}
                <div className="p-4 border-t border-neutral/10">
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                    Soporte
                  </h3>
                  <div className="space-y-1">
                    <Link
                      href="/help"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg"
                    >
                      Centro de Ayuda
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg"
                    >
                      Contacto
                    </Link>
                    <Link
                      href="/profile/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg"
                    >
                      Configuración
                    </Link>
                  </div>
                </div>

                {/* Sign In/Out */}
                <div className="p-4 border-t border-neutral/10">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Subheader />
    </>
  );
}
