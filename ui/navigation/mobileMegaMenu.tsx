"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
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

interface MobileMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMegaMenu({
  isOpen,
  onClose,
}: MobileMegaMenuProps) {
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden bg-white border-t border-neutral/20 shadow-lg overflow-hidden"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Mercado Accordion */}
        <div className="border-b border-neutral/10">
          <button
            onClick={() => toggleAccordion("mercado")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-light/50 transition-colors"
          >
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Mercado</span>
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
                className="overflow-hidden bg-neutral-light/20"
              >
                {marketplaceDepartments.map((department) => (
                  <div
                    key={department.id}
                    className="border-b border-neutral/5 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleDepartment(department.id)}
                      className="w-full flex items-center justify-between p-3 pl-8 text-left hover:bg-white/50 transition-colors"
                    >
                      <span className="text-text-secondary">
                        {department.title}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                          openDepartment === department.id ? "rotate-90" : ""
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
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-2 pl-12 text-left hover:bg-white/50 transition-colors"
                              >
                                <span className="text-text-muted text-sm">
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
                                          onClick={onClose}
                                          className="block p-2 pl-16 text-sm text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
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
        <div className="border-b border-neutral/10">
          <button
            onClick={() => toggleAccordion("tiendas")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-light/50 transition-colors"
          >
            <div className="flex items-center">
              <Store className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Tiendas</span>
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
                className="overflow-hidden bg-neutral-light/20"
              >
                {storeCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/stores?category=${category.id}`}
                    onClick={onClose}
                    className="block p-3 pl-8 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="font-medium text-text-secondary mb-1">
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
        <div className="border-b border-neutral/10">
          <button
            onClick={() => toggleAccordion("servicios")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-light/50 transition-colors"
          >
            <div className="flex items-center">
              <Wrench className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Servicios</span>
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
                className="overflow-hidden bg-neutral-light/20"
              >
                {serviceCategories.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services?category=${service.id}`}
                    onClick={onClose}
                    className="block p-3 pl-8 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="font-medium text-text-secondary mb-1">
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
        <div className="border-b border-neutral/10">
          <button
            onClick={() => toggleAccordion("comunidad")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-light/50 transition-colors"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Comunidad</span>
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
                className="overflow-hidden bg-neutral-light/20"
              >
                <Link
                  href="/community/forums"
                  onClick={onClose}
                  className="block p-3 pl-8 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
                    Foros
                  </h4>
                  <p className="text-xs text-text-muted">
                    Discute temas ambientales
                  </p>
                </Link>
                <Link
                  href="/community/events"
                  onClick={onClose}
                  className="block p-3 pl-8 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
                    Eventos
                  </h4>
                  <p className="text-xs text-text-muted">
                    Actividades ecológicas
                  </p>
                </Link>
                <Link
                  href="/community/groups"
                  onClick={onClose}
                  className="block p-3 pl-8 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
                    Grupos
                  </h4>
                  <p className="text-xs text-text-muted">Únete a comunidades</p>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Blog Accordion */}
        <div>
          <button
            onClick={() => toggleAccordion("blog")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-light/50 transition-colors"
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Blog</span>
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
                className="overflow-hidden bg-neutral-light/20"
              >
                <Link
                  href="/blog/sustainability"
                  onClick={onClose}
                  className="block p-3 pl-8 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
                    Sostenibilidad
                  </h4>
                  <p className="text-xs text-text-muted">Guías y consejos</p>
                </Link>
                <Link
                  href="/blog/reviews"
                  onClick={onClose}
                  className="block p-3 pl-8 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
                    Reviews
                  </h4>
                  <p className="text-xs text-text-muted">
                    Análisis de productos
                  </p>
                </Link>
                <Link
                  href="/blog/news"
                  onClick={onClose}
                  className="block p-3 pl-8 hover:bg-white/50 transition-colors"
                >
                  <h4 className="font-medium text-text-secondary mb-1">
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
    </motion.div>
  );
}
