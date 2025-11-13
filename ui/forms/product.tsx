"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Select from "../inputs/select";
import Input from "../inputs/input";
import { Upload, X, Image as ImageIcon, Leaf, Recycle, ArrowLeftRight, DollarSign, PackageSearch } from "lucide-react";
import { type ProductCondition } from "@/types/enums";
import { type Seller } from "@/types/user";
import clsx from "clsx";
import Image from "next/image";
import { Text } from "../text/text";
import useProductForm from "@/hooks/useProductForm";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  images: string[]; // Blob URLs
  tags: string[];
  brand: string;
  color?: string;
  isExchangeable: boolean;
  listingType: "sale" | "exchange"; // New: user selects sale OR exchange
  conditionDescription?: string;
  // Person seller fields
  departmentId?: number;
  departmentCategoryId?: number;
  productCategoryId?: number;
  // Business seller fields
  storeCategoryId?: number;
  storeSubcategoryId?: number;
};

type Props = {
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting?: boolean;
  productId?: number;
  mode?: "create" | "edit";
  sellerData?: Seller | null;
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

export default function ProductForm({ onSubmit, isSubmitting = false, productId, mode = "create", sellerData }: Props) {
  const {
    departments,
    departmentCategories,
    productCategories,
    storeCategories,
    storeSubcategories,
    departmentSelected,
    departmentCategorySelected,
    productCategorySelected,
    storeCategorySelected,
    storeSubcategorySelected,
    handleDepartmentSelect,
    handleDepartmentCategorySelect,
    handleProductCategorySelect,
    handleStoreCategorySelect,
    handleStoreSubcategorySelect,
  } = useProductForm();

  console.log("PRODUCT CATEGORIES:: ", productCategories);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    condition: "NEW",
    images: [],
    tags: [],
    brand: "",
    color: "",
    isExchangeable: false,
    listingType: "sale",
    conditionDescription: "",
    departmentId: undefined,
    departmentCategoryId: undefined,
    productCategoryId: undefined,
    storeCategoryId: undefined,
    storeSubcategoryId: undefined,
  });

  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPerson = sellerData?.sellerType === "PERSON";
  const maxImages = 3;

  // Calculate environmental impact based on selected product category
  const calculateEnvironmentalImpact = () => {
    if (!productCategorySelected?.materials || productCategorySelected.materials.length === 0) {
      return { totalCo2: 0, totalWater: 0, materials: [] };
    }

    let totalCo2 = 0;
    let totalWater = 0;
    const materialsData = productCategorySelected.materials.map((mat) => {
      const co2Savings = mat.material.estimatedCo2SavingsKG * mat.quantity;
      const waterSavings = mat.material.estimatedWaterSavingsLT * mat.quantity;

      totalCo2 += co2Savings;
      totalWater += waterSavings;

      return {
        name: mat.material.materialType,
        percentage: parseFloat(mat.unit),
        isPrimary: mat.isPrimary,
        co2Savings,
        waterSavings,
      };
    });

    return {
      totalCo2: parseFloat(totalCo2.toFixed(2)),
      totalWater: parseFloat(totalWater.toFixed(2)),
      materials: materialsData.sort((a, b) => b.percentage - a.percentage),
    };
  };

  const environmentalImpact = isPerson
    ? calculateEnvironmentalImpact()
    : { totalCo2: 2.5, totalWater: 50, materials: [] };

  // Load product data if editing
  useEffect(() => {
    if (mode === "edit" && productId) {
      // TODO: Load product data from API
    }
  }, [mode, productId]);

  const handleInputChange = (field: keyof ProductFormData, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Limit to 3 images total
    const remainingSlots = maxImages - formData.images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      // Create blob URLs for preview
      const newBlobUrls = filesToAdd.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newBlobUrls],
      }));
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    // Revoke the blob URL to free memory
    URL.revokeObjectURL(formData.images[index]);

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 10) {
      handleInputChange("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleListingTypeChange = (type: "sale" | "exchange") => {
    setFormData((prev) => ({
      ...prev,
      listingType: type,
      isExchangeable: type === "exchange",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      formData.images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  return (
    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Listing Type Selection - Only for PERSON sellers */}
      {isPerson && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border-2 border-green-200 dark:border-green-700"
        >
          <Text variant="label" className="block mb-3 text-gray-700 dark:text-gray-200 font-semibold">
            ¿Qué deseas hacer con este producto?
          </Text>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleListingTypeChange("sale")}
              disabled={isSubmitting}
              className={clsx(
                "relative p-4 rounded-lg border-2 transition-all duration-300 group",
                "hover:shadow-lg hover:scale-[1.02]",
                formData.listingType === "sale"
                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50"
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                <DollarSign
                  className={clsx(
                    "w-8 h-8 transition-colors",
                    formData.listingType === "sale" ? "text-primary" : "text-gray-500 group-hover:text-primary"
                  )}
                />
                <Text
                  variant="span"
                  className={clsx(
                    "font-medium text-center",
                    formData.listingType === "sale" ? "text-primary" : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  Vender
                </Text>
                <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Recibe dinero por tu producto
                </Text>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleListingTypeChange("exchange")}
              disabled={isSubmitting}
              className={clsx(
                "relative p-4 rounded-lg border-2 transition-all duration-300 group",
                "hover:shadow-lg hover:scale-[1.02]",
                formData.listingType === "exchange"
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-md"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-teal-500/50"
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                <ArrowLeftRight
                  className={clsx(
                    "w-8 h-8 transition-colors",
                    formData.listingType === "exchange" ? "text-teal-500" : "text-gray-500 group-hover:text-teal-500"
                  )}
                />
                <Text
                  variant="span"
                  className={clsx(
                    "font-medium text-center",
                    formData.listingType === "exchange"
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  Intercambiar
                </Text>
                <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Cambia por otro producto
                </Text>
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {/* Product Name */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Input
          type="text"
          id="name"
          required
          label="Nombre del Producto *"
          value={formData.name}
          onChange={(e) => handleInputChange("name", (e as React.ChangeEvent<HTMLInputElement>).target.value)}
          placeholder="Ej: iPhone 12 Pro Max 128GB"
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
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
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
          {formData.description.length}/1000 caracteres
        </Text>
      </motion.div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {formData.listingType === "sale" ? "Precio ($) *" : "Precio Referencial ($)"}
          </label>
          <input
            type="number"
            id="price"
            required={formData.listingType === "sale"}
            value={formData.price}
            onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
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
          {formData.listingType === "exchange" && (
            <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Precio aproximado para referencia
            </Text>
          )}
        </motion.div>
      </div>

      {/* Category Selection - Person Seller (Departments, Department Categories, Product Categories) */}
      {isPerson && (
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
                  handleInputChange("departmentId", dept.id);
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
                    handleInputChange("departmentCategoryId", cat.id);
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
                    handleInputChange("productCategoryId", cat.id);
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
      {!isPerson && (
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
                  handleInputChange("storeCategoryId", cat.id);
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
                    handleInputChange("storeSubcategoryId", sub.id);
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
            value={formData.brand}
            onChange={(e) => handleInputChange("brand", (e as React.ChangeEvent<HTMLInputElement>).target.value)}
            placeholder="Ej: Apple, Samsung, Nike..."
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <Input
            type="text"
            id="color"
            label="Color"
            value={formData.color || ""}
            onChange={(e) => handleInputChange("color", (e as React.ChangeEvent<HTMLInputElement>).target.value)}
            placeholder="Ej: Negro, Azul..."
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
              onClick={() => handleInputChange("condition", cond.value)}
              disabled={isSubmitting}
              className={clsx(
                "p-3 rounded-lg border-2 text-left transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02]",
                formData.condition === cond.value
                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-md"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50"
              )}
            >
              <Text
                variant="span"
                className={clsx(
                  "font-medium block mb-1",
                  formData.condition === cond.value ? "text-primary" : "text-gray-700 dark:text-gray-300"
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
          value={formData.conditionDescription}
          onChange={(e) => handleInputChange("conditionDescription", e.target.value)}
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
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Imágenes del Producto * (Máximo {maxImages})
        </label>

        {/* Upload Area */}
        <div
          className={clsx(
            "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200",
            formData.images.length >= maxImages
              ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-50"
              : "border-primary/40 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 hover:border-primary hover:bg-primary/10"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={isSubmitting || formData.images.length >= maxImages}
          />
          <label
            htmlFor="image-upload"
            className={clsx(
              "cursor-pointer flex flex-col items-center",
              formData.images.length >= maxImages && "cursor-not-allowed"
            )}
          >
            <Upload
              className={clsx("w-12 h-12 mb-3", formData.images.length >= maxImages ? "text-gray-400" : "text-primary")}
            />
            <Text variant="p" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              {formData.images.length >= maxImages
                ? "Límite de imágenes alcanzado"
                : "Haz clic para seleccionar imágenes"}
            </Text>
            <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, WEBP hasta 5MB cada una
            </Text>
          </label>
        </div>

        {/* Image Previews */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.images.map((imageUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                <Image src={imageUrl} alt={`Preview ${index + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  disabled={isSubmitting}
                  className={clsx(
                    "absolute top-2 right-2 p-1.5 rounded-full",
                    "bg-red-500 text-white shadow-lg",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    "hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  )}
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs rounded-md shadow-md">
                    Principal
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tags */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Etiquetas (Opcional, máx. 10)
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
            disabled={isSubmitting || formData.tags.length >= 10}
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
            disabled={isSubmitting || !tagInput.trim() || formData.tags.length >= 10}
          >
            Agregar
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
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
        {formData.tags.length > 0 && (
          <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
            {formData.tags.length}/10 etiquetas
          </Text>
        )}
      </motion.div>

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
        {isPerson && environmentalImpact.materials.length > 0 && (
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
