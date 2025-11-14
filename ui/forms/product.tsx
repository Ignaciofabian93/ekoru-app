"use client";
import { motion } from "motion/react";
import {
  Department,
  DepartmentCategory,
  Product,
  ProductCategory,
  StoreCategory,
  StoreProduct,
  StoreSubCategory,
} from "@/types/product";
import { Text } from "../text/text";
import { SellerType, type ProductCondition, Badge } from "@/types/enums";
import {
  Image as ImageIcon,
  Leaf,
  Recycle,
  ArrowLeftRight,
  DollarSign,
  PackageSearch,
  Package,
  ScanLine,
  Target,
  LucideIcon,
  X,
} from "lucide-react";
import clsx from "clsx";
import Select from "../inputs/select";
import Input from "../inputs/input";
import ImageUploader from "../imageUploader/imageUploader";
import BadgeSelector from "../badgeSelector/badgeSelector";
import { ApolloError } from "@apollo/client";
import { EnvironmentalImpactResult } from "@/utils/calculateEnvImpact";

type Props = {
  isSubmitting?: boolean;
  departments: Department[];
  departmentError: ApolloError | undefined;
  departmentLoading: boolean;
  departmentCategories: DepartmentCategory[];
  departmentCategoriesError: ApolloError | undefined;
  departmentCategoriesLoading: boolean;
  productCategories: ProductCategory[];
  productCategoriesError: ApolloError | undefined;
  productCategoriesLoading: boolean;
  departmentSelected: Department | null | undefined;
  departmentCategorySelected: DepartmentCategory | null | undefined;
  productCategorySelected: ProductCategory | null | undefined;
  formData: Partial<Product | StoreProduct>;
  handleDepartmentSelect: (department: Department) => void;
  handleDepartmentCategorySelect: (category: DepartmentCategory) => void;
  handleProductCategorySelect: (category: ProductCategory) => void;
  handleFormDataChange: (changes: Partial<Product | StoreProduct>) => void;
  handleStoreCategorySelect: (category: StoreCategory) => void;
  handleStoreSubcategorySelect: (subcategory: StoreSubCategory) => void;
  storeCategorySelected: StoreCategory | null | undefined;
  storeSubcategorySelected: StoreSubCategory | null | undefined;
  storeCategories: StoreCategory[];
  storeCategoriesError: ApolloError | undefined;
  storeCategoriesLoading: boolean;
  storeSubcategories: StoreSubCategory[];
  storeSubcategoriesError: ApolloError | undefined;
  storeSubcategoriesLoading: boolean;
  sellerType: SellerType;
  isPersonProfile: boolean;
  environmentalImpact: EnvironmentalImpactResult;
  // Image management
  productImages: (File | string)[];
  handleImagesChange: (images: (File | string)[]) => void;
  maxImages: number;
  // Tag management
  tagInput: string;
  setTagInput: (value: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  // Badge management
  handleBadgeToggle: (badge: Badge) => void;
  // Form submission
  handleSubmit: (e: React.FormEvent) => void;
};

const conditions: { value: ProductCondition; label: string; description: string }[] = [
  { value: "NEW", label: "Nuevo", description: "Sin usar, en empaque original" },
  { value: "OPEN_BOX", label: "Caja Abierta", description: "Nuevo pero sin empaque original" },
  { value: "LIKE_NEW", label: "Como Nuevo", description: "Usado brevemente, excelente estado" },
  { value: "FAIR", label: "Buen Estado", description: "Uso normal, funcional" },
  { value: "POOR", label: "Usado", description: "Desgaste visible, funcional" },
  { value: "FOR_PARTS", label: "Para Repuestos", description: "No funcional o para piezas" },
  { value: "REFURBISHED", label: "Reacondicionado", description: "Restaurado a condición funcional" },
];

export default function ProductForm({
  isSubmitting = false,
  departments,
  departmentCategories,
  productCategories,
  departmentSelected,
  departmentCategorySelected,
  productCategorySelected,
  formData,
  handleDepartmentSelect,
  handleDepartmentCategorySelect,
  handleProductCategorySelect,
  handleFormDataChange,
  handleStoreCategorySelect,
  handleStoreSubcategorySelect,
  storeCategorySelected,
  storeSubcategorySelected,
  storeCategories,
  storeSubcategories,
  isPersonProfile,
  environmentalImpact,
  // Image management
  productImages,
  handleImagesChange,
  maxImages,
  // Tag management
  tagInput,
  setTagInput,
  handleAddTag,
  handleRemoveTag,
  // Badge management
  handleBadgeToggle,
  // Form submission
  handleSubmit,
}: Props) {
  const isExchangeable = isPersonProfile && (formData as Product).isExchangeable;

  const TransactionTypeButton = ({
    isExchangeable,
    icon: Icon,
    text,
    description,
  }: {
    isExchangeable: boolean;
    icon: LucideIcon;
    text: string;
    description: string;
  }) => {
    return (
      <button
        type="button"
        onClick={() => handleFormDataChange({ isExchangeable: isExchangeable })}
        disabled={isSubmitting}
        className={clsx(
          "relative p-4 rounded-lg border-2 transition-all duration-300 group",
          "hover:shadow-lg hover:scale-[1.02]",
          !isExchangeable
            ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50"
        )}
      >
        <div className="flex flex-col items-center space-y-2">
          <Icon
            className={clsx(
              "w-8 h-8 transition-colors",
              !isExchangeable ? "text-primary" : "text-gray-500 group-hover:text-primary"
            )}
          />
          <Text
            variant="span"
            className={clsx(
              "font-medium text-center",
              !isExchangeable ? "text-primary" : "text-gray-700 dark:text-gray-300"
            )}
          >
            {text}
          </Text>
          <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {description}
          </Text>
        </div>
      </button>
    );
  };

  const TransactionSelection = () =>
    isPersonProfile && (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Text variant="label" className="mb-3 font-semibold">
          ¿Qué deseas hacer con este producto?
        </Text>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <TransactionTypeButton
            isExchangeable={false}
            icon={DollarSign}
            text="Vender"
            description="Recibe dinero por tu producto"
          />

          <TransactionTypeButton
            isExchangeable={true}
            icon={ArrowLeftRight}
            text="Intercambiar"
            description="Cambia por otro producto"
          />
        </div>
      </motion.div>
    );

  return (
    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Listing Type Selection - Only for PERSON sellers */}
      <TransactionSelection />

      {/* Product Name */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Input
          type="text"
          id="name"
          required
          label="Nombre del Producto *"
          value={formData.name || ""}
          onChange={(e) => handleFormDataChange({ name: (e as React.ChangeEvent<HTMLInputElement>).target.value })}
          placeholder="Ej: iPhone 12 Pro Max 128GB"
          icon={Package}
        />
      </motion.div>

      {/* Description */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Descripción *
        </label>
        <textarea
          id="description"
          required
          rows={5}
          value={formData.description || ""}
          onChange={(e) => handleFormDataChange({ description: e.target.value })}
          className={clsx(
            "w-full px-4 py-3 border rounded-lg resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          placeholder="Describe tu producto en detalle: características, estado, razón de venta..."
          disabled={isSubmitting}
        />
        <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {(formData.description || "").length}/1000 caracteres
        </Text>
      </motion.div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {!isExchangeable ? "Precio ($) *" : "Precio Referencial ($)"}
          </label>
          <input
            type="number"
            id="price"
            required={!isExchangeable}
            value={formData.price || 0}
            onChange={(e) => handleFormDataChange({ price: parseFloat(e.target.value) || 0 })}
            placeholder="0"
            min={0}
            step={1}
            className={clsx(
              "w-full px-4 py-3 border rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
              "transition-all duration-200"
            )}
          />
          {!isExchangeable && (
            <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Precio aproximado para referencia
            </Text>
          )}
        </motion.div>
      </div>

      {/* Category Selection - Person Seller (Departments, Department Categories, Product Categories) */}
      {isPersonProfile && (
        <>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <Select
              label="Departamento *"
              options={departments.map((dept) => ({ value: dept.id.toString(), label: dept.departmentName }))}
              value={departmentSelected?.id.toString() || ""}
              onChange={(value) => {
                const dept = departments.find((d) => d.id.toString() === value);
                if (dept) {
                  handleDepartmentSelect(dept);
                }
              }}
              placeholder="Selecciona un departamento"
              disabled={isSubmitting}
              icon={PackageSearch}
            />
          </motion.div>

          {departmentSelected && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Select
                label="Categoría de Departamento *"
                options={departmentCategories.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.departmentCategoryName,
                }))}
                value={departmentCategorySelected?.id.toString() || ""}
                onChange={(value) => {
                  const cat = departmentCategories.find((c) => c.id.toString() === value);
                  if (cat) {
                    handleDepartmentCategorySelect(cat);
                  }
                }}
                placeholder="Selecciona una categoría de departamento"
                disabled={isSubmitting}
                icon={PackageSearch}
              />
            </motion.div>
          )}

          {departmentCategorySelected && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <Select
                label="Categoría de Producto *"
                options={productCategories.map((cat) => ({ value: cat.id.toString(), label: cat.productCategoryName }))}
                value={productCategorySelected?.id.toString() || ""}
                onChange={(value) => {
                  const cat = productCategories.find((c) => c.id.toString() === value);
                  if (cat) {
                    handleProductCategorySelect(cat);
                    handleFormDataChange({ productCategoryId: cat.id });
                  }
                }}
                placeholder="Selecciona una categoría de producto"
                disabled={isSubmitting}
                icon={PackageSearch}
              />
            </motion.div>
          )}
        </>
      )}

      {/* Category Selection - Business Seller (Store Categories, Store Subcategories) */}
      {!isPersonProfile && (
        <>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <Select
              label="Categoría de Tienda *"
              options={storeCategories.map((cat) => ({ value: cat.id.toString(), label: cat.category }))}
              value={storeCategorySelected?.id.toString() || ""}
              onChange={(value) => {
                const cat = storeCategories.find((c) => c.id.toString() === value);
                if (cat) {
                  handleStoreCategorySelect(cat);
                }
              }}
              placeholder="Selecciona una categoría de tienda"
              disabled={isSubmitting}
            />
          </motion.div>

          {storeCategorySelected && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Select
                label="Subcategoría de Tienda *"
                options={storeSubcategories.map((sub) => ({ value: sub.id.toString(), label: sub.subCategory }))}
                value={storeSubcategorySelected?.id.toString() || ""}
                onChange={(value) => {
                  const sub = storeSubcategories.find((s) => s.id.toString() === value);
                  if (sub) {
                    handleStoreSubcategorySelect(sub);
                    handleFormDataChange({ storeSubCategoryId: sub.id });
                  }
                }}
                placeholder="Selecciona una subcategoría de tienda"
                disabled={isSubmitting}
              />
            </motion.div>
          )}
        </>
      )}

      {/* Brand and Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Input
            type="text"
            id="brand"
            label="Marca"
            value={(formData.brand as string) || ""}
            onChange={(e) => handleFormDataChange({ brand: (e as React.ChangeEvent<HTMLInputElement>).target.value })}
            placeholder="Ej: Apple, Samsung, Nike..."
            icon={ScanLine}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <Input
            type="text"
            id="color"
            label="Color"
            value={formData.color || ""}
            onChange={(e) => handleFormDataChange({ color: (e as React.ChangeEvent<HTMLInputElement>).target.value })}
            placeholder="Ej: Negro, Azul..."
            icon={Target}
          />
        </motion.div>
      </div>

      {/* Condition */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado del Producto *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {conditions.map((cond) => (
            <button
              key={cond.value}
              type="button"
              onClick={() => handleFormDataChange({ condition: cond.value })}
              disabled={isSubmitting}
              className={clsx(
                "p-3 rounded-lg border-2 text-left transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02]",
                (formData as Product).condition === cond.value
                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50"
              )}
            >
              <Text
                variant="span"
                className={clsx(
                  "font-medium block mb-1",
                  (formData as Product).condition === cond.value ? "text-primary" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {cond.label}
              </Text>
              <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400">
                {cond.description}
              </Text>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Condition Description */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
        <label
          htmlFor="conditionDescription"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Detalles del Estado (Opcional)
        </label>
        <textarea
          id="conditionDescription"
          rows={3}
          value={(formData as Product).conditionDescription || ""}
          onChange={(e) => handleFormDataChange({ conditionDescription: e.target.value })}
          className={clsx(
            "w-full px-4 py-3 border rounded-lg resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
            "transition-all duration-200"
          )}
          placeholder="Describe cualquier detalle adicional sobre el estado del producto..."
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Image Upload */}
      <ImageUploader
        images={productImages}
        onImagesChange={handleImagesChange}
        maxImages={maxImages}
        isSubmitting={isSubmitting}
      />

      {/* Badge Selector */}
      <BadgeSelector
        selectedBadges={formData.badges || []}
        onBadgeToggle={handleBadgeToggle}
        isSubmitting={isSubmitting}
        maxBadges={5}
      />

      {/* Tags */}
      {isPersonProfile && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Intereses/Etiquetas (Opcional, máx. 10)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className={clsx(
                "flex-1 px-4 py-2 border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              placeholder="Ej: vintage, gaming, portátil..."
              disabled={isSubmitting || ((formData as Product).interests || []).length >= 10}
              maxLength={20}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className={clsx(
                "px-6 py-2 rounded-lg font-medium transition-all duration-200",
                "bg-primary text-white hover:bg-primary-dark",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={isSubmitting || !tagInput.trim() || ((formData as Product).interests || []).length >= 10}
            >
              Agregar
            </button>
          </div>
          {((formData as Product).interests || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {((formData as Product).interests || []).map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={clsx(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                    "bg-gradient-to-r from-primary/20 to-teal-500/20",
                    "border border-primary/30 dark:border-primary/40",
                    "text-primary-dark dark:text-primary-light"
                  )}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 transition-colors"
                    disabled={isSubmitting}
                    aria-label={`Eliminar etiqueta ${tag}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.span>
              ))}
            </div>
          )}
          {((formData as Product).interests || []).length > 0 && (
            <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
              {((formData as Product).interests || []).length}/10 etiquetas
            </Text>
          )}
        </motion.div>
      )}

      {/* Environmental Impact Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <Text variant="p" className="font-bold text-gray-800 dark:text-gray-100">
              Impacto Ambiental Estimado
            </Text>
            <Text variant="span" className="text-sm text-gray-600 dark:text-gray-300">
              Al reutilizar este producto, contribuyes a:
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Recycle className="w-8 h-8 text-blue-500" />
            <div>
              <Text variant="p" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ~{environmentalImpact.totalCo2} kg
              </Text>
              <Text variant="span" className="text-xs text-gray-600 dark:text-gray-400">
                CO₂ ahorrado (promedio)
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <ImageIcon className="w-8 h-8 text-cyan-500" />
            <div>
              <Text variant="p" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ~{environmentalImpact.totalWater} L
              </Text>
              <Text variant="span" className="text-xs text-gray-600 dark:text-gray-400">
                Agua ahorrada (promedio)
              </Text>
            </div>
          </div>
        </div>

        {/* Material Composition */}
        {isPersonProfile && environmentalImpact.materials?.length > 0 && (
          <div className="mt-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
            <Text variant="p" className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Composición de Materiales (promedio)
            </Text>
            <div className="space-y-2">
              {environmentalImpact.materials.map((material, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={clsx("w-2 h-2 rounded-full", material.isPrimary ? "bg-green-500" : "bg-gray-400")}
                    />
                    <Text variant="span" className="text-sm text-gray-700 dark:text-gray-300">
                      {material.name}{" "}
                      {material.isPrimary && (
                        <Text variant="small" className="ml-2">
                          (Material principal)
                        </Text>
                      )}
                    </Text>
                  </div>
                  <Text variant="span" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {material.percentage}%
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-3 block text-center italic">
          * Estimaciones promedio basadas en la categoría del producto
        </Text>
      </motion.div>
    </form>
  );
}
