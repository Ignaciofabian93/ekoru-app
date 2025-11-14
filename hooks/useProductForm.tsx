import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Department,
  DepartmentCategory,
  Product,
  ProductCategory,
  StoreCategory,
  StoreProduct,
  StoreSubCategory,
} from "@/types/product";
import {
  GET_DEPARTMENT_CATEGORIES_BY_DEPARTMENT_ID,
  GET_DEPARTMENTS,
  GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY_ID,
  GET_STORE_CATEGORIES,
  GET_STORE_SUBCATEGORIES_BY_CATEGORY_ID,
} from "@/graphql/product/queries";
import { calculateEnvironmentalImpact } from "@/utils/calculateEnvImpact";
import { Badge } from "@/types/enums";
import useSessionData from "./useSessionData";
import useAlert from "./useAlert";

export default function useProductForm() {
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const { sellerType, isPersonProfile, data } = useSessionData();
  const { notify, notifyError } = useAlert();

  const closeProductForm = () => setIsProductFormOpen(false);
  const openProductForm = () => setIsProductFormOpen(true);

  const [departmentSelected, setDepartmentSelected] = useState<Department | null>();
  const [departmentCategorySelected, setDepartmentCategorySelected] = useState<DepartmentCategory | null>();
  const [productCategorySelected, setProductCategorySelected] = useState<ProductCategory | null>();

  const [storeCategorySelected, setStoreCategorySelected] = useState<StoreCategory | null>();
  const [storeSubcategorySelected, setStoreSubcategorySelected] = useState<StoreSubCategory | null>();

  const [formData, setFormData] = useState<Partial<Product | StoreProduct>>(() => {
    // Initialize with type-specific fields based on seller type
    const baseData = {
      badges: [],
      images: [],
      name: "",
      description: "",
      price: 0,
    };

    // Add isExchangeable for Person profiles (Product type)
    if (isPersonProfile) {
      return {
        ...baseData,
        isExchangeable: false, // Default to selling
        interests: [],
      } as Partial<Product>;
    }

    // Return base data for Business profiles (StoreProduct type)
    return baseData as Partial<StoreProduct>;
  });
  const [productImages, setProductImages] = useState<(File | string)[]>(["", "", ""]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxImages = 3;

  const environmentalImpact = calculateEnvironmentalImpact({ materials: productCategorySelected?.materials || [] });

  const handleDepartmentSelect = (department: Department) => {
    setDepartmentSelected(department);
    setDepartmentCategorySelected(null);
    setProductCategorySelected(null);
  };

  const handleDepartmentCategorySelect = (departmentCategory: DepartmentCategory) => {
    setDepartmentCategorySelected(departmentCategory);
    setProductCategorySelected(null);
  };

  const handleProductCategorySelect = (productCategory: ProductCategory) => {
    setProductCategorySelected(productCategory);
  };

  const handleStoreCategorySelect = (category: StoreCategory) => {
    setStoreCategorySelected(category);
    setStoreSubcategorySelected(null);
  };

  const handleStoreSubcategorySelect = (subcategory: StoreSubCategory) => {
    setStoreSubcategorySelected(subcategory);
  };

  const handleFormDataChange = (updatedData: Partial<Product> | Partial<StoreProduct>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  // Badge management
  const handleBadgeToggle = (badge: Badge) => {
    setFormData((prevData) => {
      const currentBadges = prevData.badges || [];
      const badgeExists = currentBadges.includes(badge);

      return {
        ...prevData,
        badges: badgeExists ? currentBadges.filter((b) => b !== badge) : [...currentBadges, badge],
      };
    });
  };

  // Tag management
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    // For products, we'll use the interests field for tags
    const currentTags = isPersonProfile ? (formData as Product).interests || [] : [];

    if (currentTags.length >= 10) {
      notifyError("Máximo 10 etiquetas permitidas");
      return;
    }

    if (currentTags.includes(trimmedTag)) {
      notifyError("Esta etiqueta ya existe");
      return;
    }

    if (isPersonProfile) {
      handleFormDataChange({
        interests: [...currentTags, trimmedTag],
      });
    }

    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    if (isPersonProfile) {
      const currentTags = (formData as Product).interests || [];
      handleFormDataChange({
        interests: currentTags.filter((t) => t !== tag),
      });
    }
  };

  // Image management (no upload until form submit)
  const handleImagesChange = (images: (File | string)[]) => {
    setProductImages(images);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Function to prepare and upload product images (called during form submit)
  const uploadProductImages = async (files: File[]): Promise<string[]> => {
    const formDataToSend = new FormData();
    files.forEach((file) => {
      formDataToSend.append("files", file);
    });
    formDataToSend.append("userId", data.id);

    const response = await fetch("/api/upload/product-images", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (!result.imageUrls || !Array.isArray(result.imageUrls)) {
      throw new Error("No se recibieron URLs de las imágenes del servidor");
    }

    return result.imageUrls;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name?.trim()) {
      notifyError("El nombre del producto es requerido");
      return;
    }

    if (!formData.description?.trim()) {
      notifyError("La descripción es requerida");
      return;
    }

    // Check if at least one image is uploaded
    const validImages = productImages.filter((img) => img && img !== "");
    if (validImages.length === 0) {
      notifyError("Debes agregar al menos 1 imagen");
      return;
    }

    if (isPersonProfile) {
      if (!productCategorySelected) {
        notifyError("Debes seleccionar una categoría de producto");
        return;
      }
    } else {
      if (!storeSubcategorySelected) {
        notifyError("Debes seleccionar una subcategoría de tienda");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // TODO: Handle image upload here
      // 1. Filter out File objects from productImages
      // 2. Compress them using compressImageClient
      // 3. Upload using uploadProductImages (REST API)
      // 4. Get back the image URLs
      // 5. Combine with any existing string URLs if editing

      const imageFiles = validImages.filter((img): img is File => img instanceof File);

      console.log("Images to upload (File objects):", imageFiles);
      console.log("Form data:", formData);

      // Example of how you would handle this:
      // if (imageFiles.length > 0) {
      //   const compressedFiles = await Promise.all(
      //     imageFiles.map(file => compressImageClient({ file, maxWidth: 1200, maxHeight: 1200 }))
      //   );
      //   const uploadedImageUrls = await uploadProductImages(compressedFiles);
      //   // Then use uploadedImageUrls in your GraphQL mutation
      // }

      // TODO: Call your GraphQL mutation here with the product data
      // The mutation should receive all form data EXCEPT images (since images are handled via REST)

      notify("Producto creado exitosamente");
      // Reset form or close modal
      closeProductForm();
    } catch {
      console.error("Error submitting product");
      notifyError("Error al crear el producto. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("FORM DATA:: ", formData);

  const {
    data: departments,
    error: departmentError,
    loading: departmentLoading,
  } = useQuery(GET_DEPARTMENTS, {
    fetchPolicy: "cache-first",
    skip: sellerType !== "PERSON",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: departmentCategories,
    error: departmentCategoriesError,
    loading: departmentCategoriesLoading,
  } = useQuery(GET_DEPARTMENT_CATEGORIES_BY_DEPARTMENT_ID, {
    variables: {
      departmentId: departmentSelected?.id || 1,
    },
    fetchPolicy: "cache-first",
    skip: sellerType !== "PERSON",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: productCategories,
    error: productCategoriesError,
    loading: productCategoriesLoading,
  } = useQuery(GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY_ID, {
    variables: {
      departmentCategoryId: departmentCategorySelected?.id || 1,
    },
    fetchPolicy: "cache-first",
    skip: sellerType !== "PERSON",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: storeCategories,
    error: storeCategoriesError,
    loading: storeCategoriesLoading,
  } = useQuery(GET_STORE_CATEGORIES, {
    fetchPolicy: "cache-first",
    skip: sellerType === "PERSON",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: storeSubcategories,
    error: storeSubcategoriesError,
    loading: storeSubcategoriesLoading,
  } = useQuery(GET_STORE_SUBCATEGORIES_BY_CATEGORY_ID, {
    variables: {
      categoryId: storeCategorySelected?.id || 1,
    },
    fetchPolicy: "cache-first",
    skip: sellerType === "PERSON",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  return {
    departments: (departments?.getDepartments as Department[]) || [],
    departmentError,
    departmentLoading,
    departmentCategories: (departmentCategories?.getDepartmentCategoriesByDepartmentId as DepartmentCategory[]) || [],
    departmentCategoriesError,
    departmentCategoriesLoading,
    productCategories: (productCategories?.getProductCategoriesByDepartmentCategoryId as ProductCategory[]) || [],
    productCategoriesError,
    productCategoriesLoading,
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
    storeCategories: (storeCategories?.getStoreCategories as StoreCategory[]) || [],
    storeCategoriesError,
    storeCategoriesLoading,
    storeSubcategories: (storeSubcategories?.getStoreSubcategoriesByCategoryId as StoreSubCategory[]) || [],
    storeSubcategoriesError,
    storeSubcategoriesLoading,
    sellerType,
    isPersonProfile,
    environmentalImpact,
    // Image management
    productImages,
    handleImagesChange,
    uploadProductImages,
    fileInputRef,
    triggerFileUpload,
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
    isSubmitting,
    // Product form modal
    isProductFormOpen,
    closeProductForm,
    openProductForm,
  };
}
