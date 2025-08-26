// Example usage of the ProductModal component

import { useState } from "react";
import ProductModal from "../ui/modals/product";

export function ExampleProductModalUsage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [productId, setProductId] = useState<string | undefined>();

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setProductId(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id: string) => {
    setModalMode("edit");
    setProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Your existing content */}

      {/* Buttons to trigger modal */}
      <button
        onClick={handleOpenCreateModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Product
      </button>

      <button
        onClick={() => handleOpenEditModal("some-product-id")}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-2"
      >
        Edit Product
      </button>

      {/* The Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        productId={productId}
      />
    </div>
  );
}

/*
  USAGE NOTES:
  
  1. Import the ProductModal component where you need it
  2. Use state to control when the modal is open/closed
  3. Pass the required props: isOpen, onClose, mode, productId
  
  The modal includes:
  ✅ Smooth animations with framer-motion
  ✅ Backdrop blur effect
  ✅ ESC key to close
  ✅ Click outside to close
  ✅ Form validation
  ✅ Loading states
  ✅ Responsive design
  ✅ Dark mode support
  ✅ Accessibility features
  
  Customization options:
  - size: "sm" | "md" | "lg" | "xl"
  - title: Custom modal title
  - mode: "create" | "edit"
  - productId: For edit mode
*/
