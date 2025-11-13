import { useState } from "react";
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
import useSessionData from "./useSessionData";

export default function useProductForm() {
  const { sellerType } = useSessionData();
  const [departmentSelected, setDepartmentSelected] = useState<Department | null>();
  const [departmentCategorySelected, setDepartmentCategorySelected] = useState<DepartmentCategory | null>();
  const [productCategorySelected, setProductCategorySelected] = useState<ProductCategory | null>();

  const [storeCategorySelected, setStoreCategorySelected] = useState<StoreCategory | null>();
  const [storeSubcategorySelected, setStoreSubcategorySelected] = useState<StoreSubCategory | null>();

  const [formData, setFormData] = useState<Product | StoreProduct>({} as Product | StoreProduct);

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
  };
}
