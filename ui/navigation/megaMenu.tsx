"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Store, Wrench, Users, BookOpen } from "lucide-react";
import { Department } from "@/types/product";
import { BlogCategories } from "@/types/blog";
import { ServiceCategory, StoreCatalog } from "@/types/catalog";
import { MegaMenuColumn, SecondaryColumn, LeafColumn, MenuItem } from "./megaMenuColumn";
import { CommunityCategory } from "@/types/community";

interface MegaMenuProps {
  activeTab: string | null;
  onClose: () => void;
  marketData: { marketCatalog: Department[] | null } | null;
  storeData: { storeCatalog: StoreCatalog[] | null } | null;
  blogData: { blogCatalog: BlogCategories[] | null } | null;
  serviceData: { serviceCatalog: ServiceCategory[] | null } | null;
  communityData: { communityCatalog: CommunityCategory[] | null } | null;
}

export default function MegaMenu({
  activeTab,
  onClose,
  marketData,
  storeData,
  blogData,
  serviceData,
  communityData,
}: MegaMenuProps) {
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
          title: subcat.subCategory,
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

  const renderServicesMenu = () => {
    if (!serviceData || !serviceData.serviceCatalog) {
      return <div className="p-6">No hay datos de servicios disponibles.</div>;
    }

    // Transform API data to MenuItem structure
    const services: MenuItem<ServiceCategory>[] = serviceData.serviceCatalog.map((service) => ({
      id: service.id,
      title: service.category,
      data: service,
    }));

    const selectedServiceData = serviceData.serviceCatalog.find((s) => s.id === selectedDepartment);
    const subcategories =
      selectedServiceData && selectedServiceData.subcategories
        ? selectedServiceData.subcategories.map((subcat) => ({
            id: subcat.id,
            title: subcat.subCategory,
            href: `/services/category/${selectedServiceData.id}/subcategory/${subcat.id}`,
          }))
        : [];

    return (
      <div className="flex min-h-[400px]">
        {/* Service Categories Column */}
        <MegaMenuColumn
          icon={Wrench}
          title="Servicios Ecológicos"
          items={services}
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

  const renderCommunityMenu = () => {
    if (!communityData || !communityData.communityCatalog) {
      return <div className="p-6">No hay datos de comunidad disponibles.</div>;
    }

    // Transform API data to MenuItem structure
    const communityCategories: MenuItem<CommunityCategory>[] = communityData.communityCatalog.map((community) => ({
      id: community.id,
      title: community.category,
      data: community,
    }));

    const selectedCommunityData = communityData.communityCatalog.find((c) => c.id === selectedDepartment);
    const subcategories =
      selectedCommunityData && selectedCommunityData.subcategories
        ? selectedCommunityData.subcategories.map((subcat) => ({
            id: subcat.id,
            title: subcat.subCategory,
            href: `/community/category/${selectedCommunityData.id}/subcategory/${subcat.id}`,
          }))
        : [];

    return (
      <div className="flex min-h-[400px]">
        {/* Community Categories Column */}
        <MegaMenuColumn
          icon={Users}
          title="Comunidad Ecológica"
          items={communityCategories}
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

  const renderBlogMenu = () => {
    if (!blogData || !blogData.blogCatalog) {
      return <div className="p-6">No hay datos de blog disponibles.</div>;
    }

    // Transform API data to MenuItem structure with direct links
    const blogCategories = blogData.blogCatalog.map((blog) => ({
      id: blog.id,
      title: blog.name,
      href: `/blog/category/${blog.id}`,
    }));

    return (
      <div className="flex min-h-[400px]">
        {/* Blog Categories Column */}
        <div className="w-80">
          <div className="p-4">
            <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Blog Ecológico
            </h4>
            <div className="space-y-1">
              {blogCategories.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors duration-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
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
