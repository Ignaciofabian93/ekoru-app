"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./modal";
import ProductForm from "../forms/product";
import { useProductStore } from "@/store/product";
import MainButton from "../buttons/mainButton";
import { Save } from "lucide-react";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: File[];
  tags: string[];
};

export default function ProductModal() {
  const { isOpen, onClose, mode, selectedProductId } = useProductStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      console.log("Submitting product data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close modal on success
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Agregar Producto" : "Editar Producto"}
      size="lg"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="space-y-6"
      >
        <div className="text-sm text-gray-600">
          {mode === "create"
            ? "Fill in the details to add a new product to your store."
            : "Update the product information below."}
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          productId={selectedProductId}
          mode={mode}
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex justify-end space-x-3 pt-4 border-t border-gray-200"
        >
          <MainButton
            text="Cancelar"
            onClick={onClose}
            disabled={isSubmitting}
            variant="outline"
            hasIcon={false}
          />
          <MainButton
            text={
              mode === "create" ? "Agregar Producto" : "Actualizar Producto"
            }
            variant="primary"
            onClick={() => {
              console.log("Main button clicked");
            }}
            hasIcon
            icon={Save}
          />
        </motion.div>
      </motion.div>
    </Modal>
  );
}
