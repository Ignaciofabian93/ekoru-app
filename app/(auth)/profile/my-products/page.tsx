"use client";
import MainButton from "@/ui/buttons/mainButton";
import MainLayout from "@/ui/layout/mainLayout";
import Modal from "@/ui/modals/modal";
import { useState } from "react";

export default function MyProductsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <MainLayout>
      <h1>Mis Productos</h1>
      <MainButton text="Abrir" onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h2 className="text-2xl font-bold mb-4">Este es un modal</h2>
          <p className="mb-4">Contenido del modal va aquí.</p>
          <MainButton text="Cerrar" onClick={() => setIsOpen(false)} />
        </div>
      </Modal>
    </MainLayout>
  );
}
