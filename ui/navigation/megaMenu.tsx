"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Store, Wrench, Users, BookOpen } from "lucide-react";
import { serviceCategories } from "@/constants/navigation/data";
import { Department } from "@/types/product";
import { BlogCategories } from "@/types/blog";
import Link from "next/link";
import { Title } from "../text/title";
import BlogCategoryCard from "../cards/blog/blogCategory";
import { Text } from "../text/text";
import { StoreCatalog } from "@/types/catalog";
import { MegaMenuColumn, SecondaryColumn, LeafColumn, MenuItem } from "./megaMenuColumn";

interface MegaMenuProps {
  activeTab: string | null;
  onClose: () => void;
  marketData: { marketCatalog: Department[] | null } | null;
  storeData: { storeCatalog: StoreCatalog[] | null } | null;
  blogData: { blogCategories: BlogCategories[] | null } | null;
}

export default function MegaMenu({ activeTab, onClose, marketData, storeData, blogData }: MegaMenuProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Use marketData from props for Mercado
  const renderMarketplaceMenu = () => {
    if (!marketData || !marketData.marketCatalog) {
      return <div className="p-6">No hay datos de mercado disponibles.</div>;
    }

    // Transform API data to MenuItem structure
    const departments: MenuItem<Department>[] = marketData.marketCatalog.map((department) => ({
      id: department.id,
      title: department.departmentName,
      data: department,
    }));

    const selectedDepartmentData = marketData.marketCatalog.find((d) => d.id === selectedDepartment);
    const categories: MenuItem[] = selectedDepartmentData
      ? selectedDepartmentData.departmentCategories.map((cat) => ({
          id: cat.id,
          title: cat.departmentCategoryName,
          data: cat,
        }))
      : [];

    const selectedCategoryData = selectedDepartmentData?.departmentCategories.find((c) => c.id === selectedCategory);
    const subcategories = selectedCategoryData
      ? selectedCategoryData.productCategories.map((subcat) => ({
          id: subcat.id,
          title: subcat.productCategoryName,
          href: `/marketplace/departments/${selectedDepartment}/categories/${selectedCategory}/products/${subcat.id}`,
        }))
      : [];

    return (
      <div className="flex min-h-[400px]">
        {/* Departments Column */}
        <MegaMenuColumn
          icon={Package}
          title="Departamentos"
          items={departments}
          selectedId={selectedDepartment}
          onSelectItem={setSelectedDepartment}
        />

        {/* Categories Column */}
        <AnimatePresence mode="wait">
          {selectedDepartment && categories.length > 0 && (
            <motion.div
              key={selectedDepartment}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SecondaryColumn
                title="Categorías"
                items={categories}
                selectedId={selectedCategory}
                onSelectItem={setSelectedCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subcategories Column */}
        <AnimatePresence mode="wait">
          {selectedCategory && selectedDepartment && subcategories.length > 0 && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <LeafColumn title="Subcategorías" items={subcategories} onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Use storeData from props for Tiendas
  const renderStoresMenu = () => {
    if (!storeData || !storeData.storeCatalog) {
      return <div className="p-6">No hay datos de tiendas disponibles.</div>;
    }

    // Transform API data to MenuItem structure
    const storeCategories: MenuItem<StoreCatalog>[] = storeData.storeCatalog.map((store) => ({
      id: store.id,
      title: store.category,
      data: store,
    }));

    const selectedStoreData = storeData.storeCatalog.find((s) => s.id === selectedDepartment);
    const subcategories = selectedStoreData
      ? selectedStoreData.subcategories.map((subcat) => ({
          id: subcat.id,
          title: subcat.subcategory,
          href: `/stores/category/${selectedStoreData.id}/subcategory/${subcat.id}`,
        }))
      : [];

    return (
      <div className="flex min-h-[400px]">
        {/* Store Categories Column */}
        <MegaMenuColumn
          icon={Store}
          title="Tiendas"
          items={storeCategories}
          selectedId={selectedDepartment}
          onSelectItem={setSelectedDepartment}
        />

        {/* Subcategories Column */}
        <AnimatePresence mode="wait">
          {selectedDepartment && subcategories.length > 0 && (
            <motion.div
              key={selectedDepartment}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <LeafColumn title="Subcategorías" items={subcategories} onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

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
            <h4 className="font-semibold text-text-primary group-hover:text-primary mb-2">{service.title}</h4>
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

  const renderBlogMenu = () => {
    return (
      <div className="p-6">
        <Title variant="h4" className="flex items-center gap-2 font-semibold mb-6">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Blog Ecológico
        </Title>
        {!blogData || !blogData.blogCategories ? (
          <div className="p-6 text-center text-text-muted">
            <BookOpen className="h-12 w-12 mx-auto mb-3 text-neutral/40" />
            <Text variant="p">No hay datos de blog disponibles.</Text>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-6 max-w-5xl">
              {blogData.blogCategories.map(({ id, name, icon, description }) => {
                return <BlogCategoryCard key={id} id={id} name={name} icon={icon} description={description} />;
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!activeTab) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-amber-50 dark:bg-stone-900 shadow-xl border-t border-neutral/20 z-30"
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
