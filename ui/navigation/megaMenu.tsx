"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
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

interface MegaMenuProps {
  activeTab: string | null;
  onClose: () => void;
}

export default function MegaMenu({ activeTab, onClose }: MegaMenuProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderMarketplaceMenu = () => (
    <div className="flex min-h-[400px]">
      {/* Departments Column */}
      <div className="w-80 border-r border-neutral/20 bg-neutral-light/30">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary" />
            Departamentos
          </h3>
          <div className="space-y-1">
            {marketplaceDepartments.map((department) => (
              <button
                key={department.id}
                onMouseEnter={() => setSelectedDepartment(department.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                  selectedDepartment === department.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-white hover:text-primary"
                }`}
              >
                <span className="font-medium">{department.title}</span>
                <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Column */}
      <AnimatePresence mode="wait">
        {selectedDepartment && (
          <motion.div
            key={selectedDepartment}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-80 border-r border-neutral/20"
          >
            <div className="p-4">
              <h4 className="text-md font-semibold text-text-primary mb-4">
                Categorías
              </h4>
              <div className="space-y-1">
                {marketplaceDepartments
                  .find((d) => d.id === selectedDepartment)
                  ?.categories.map((category) => (
                    <button
                      key={category.id}
                      onMouseEnter={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                        selectedCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "text-text-secondary hover:bg-neutral-light hover:text-primary"
                      }`}
                    >
                      <span>{category.title}</span>
                      <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subcategories Column */}
      <AnimatePresence mode="wait">
        {selectedCategory && selectedDepartment && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-80"
          >
            <div className="p-4">
              <h4 className="text-md font-semibold text-text-primary mb-4">
                Subcategorías
              </h4>
              <div className="space-y-1">
                {marketplaceDepartments
                  .find((d) => d.id === selectedDepartment)
                  ?.categories.find((c) => c.id === selectedCategory)
                  ?.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={subcategory.href}
                      onClick={onClose}
                      className="block px-3 py-2 rounded-lg text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors duration-200"
                    >
                      {subcategory.title}
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderStoresMenu = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
        <Store className="h-5 w-5 mr-2 text-primary" />
        Tipos de Tiendas
      </h3>
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {storeCategories.map((category) => (
          <Link
            key={category.id}
            href={`/stores?category=${category.id}`}
            onClick={onClose}
            className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
          >
            <h4 className="font-semibold text-text-primary group-hover:text-primary mb-2">
              {category.title}
            </h4>
            <p className="text-sm text-text-muted">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderServicesMenu = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
        <Wrench className="h-5 w-5 mr-2 text-primary" />
        Servicios Ecológicos
      </h3>
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {serviceCategories.map((service) => (
          <Link
            key={service.id}
            href={`/services?category=${service.id}`}
            onClick={onClose}
            className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
          >
            <h4 className="font-semibold text-text-primary group-hover:text-primary mb-2">
              {service.title}
            </h4>
            <p className="text-sm text-text-muted">{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderCommunityMenu = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
        <Users className="h-5 w-5 mr-2 text-primary" />
        Comunidad Ecológica
      </h3>
      <div className="grid grid-cols-3 gap-4 max-w-3xl">
        <Link
          href="/community/forums"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">Foros</h4>
          <p className="text-sm text-text-muted">Discute temas ambientales</p>
        </Link>
        <Link
          href="/community/events"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">Eventos</h4>
          <p className="text-sm text-text-muted">Actividades ecológicas</p>
        </Link>
        <Link
          href="/community/groups"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">Grupos</h4>
          <p className="text-sm text-text-muted">Únete a comunidades</p>
        </Link>
      </div>
    </div>
  );

  const renderBlogMenu = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
        <BookOpen className="h-5 w-5 mr-2 text-primary" />
        Contenido Educativo
      </h3>
      <div className="grid grid-cols-3 gap-4 max-w-3xl">
        <Link
          href="/blog/sustainability"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">
            Sostenibilidad
          </h4>
          <p className="text-sm text-text-muted">Guías y consejos</p>
        </Link>
        <Link
          href="/blog/reviews"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">Reviews</h4>
          <p className="text-sm text-text-muted">Análisis de productos</p>
        </Link>
        <Link
          href="/blog/news"
          onClick={onClose}
          className="p-4 rounded-lg border border-neutral/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <h4 className="font-semibold text-text-primary mb-2">Noticias</h4>
          <p className="text-sm text-text-muted">Actualidad ambiental</p>
        </Link>
      </div>
    </div>
  );

  if (!activeTab) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-neutral/20 z-30"
      onMouseLeave={() => {
        setSelectedDepartment(null);
        setSelectedCategory(null);
      }}
    >
      {activeTab === "Mercado" && renderMarketplaceMenu()}
      {activeTab === "Tiendas" && renderStoresMenu()}
      {activeTab === "Servicios" && renderServicesMenu()}
      {activeTab === "Comunidad" && renderCommunityMenu()}
      {activeTab === "Blog" && renderBlogMenu()}
    </motion.div>
  );
}
