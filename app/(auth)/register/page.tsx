"use client";
import { motion } from "framer-motion";
import { Mail, Lock, UserRound, ArrowRight, BadgeInfo } from "lucide-react";
import { SellerType } from "@/types/enums";
import Image from "next/image";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import MainButton from "@/ui/buttons/mainButton";
import Link from "next/link";
import useRegister from "./_hooks/useRegister";

export default function RegisterPage() {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    registerPersonLoading,
    registerStoreLoading,
    handleFormData,
    handleAccountTypeChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  } = useRegister();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo/Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-auto h-[80px] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Image
              src={"/brand/logo.webp"}
              alt="EKORU"
              width={800}
              height={400}
              className="w-auto h-full"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Crear cuenta
          </h1>
          <p className="text-gray-600">Regístrate para comenzar</p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type Selector */}
              <Select
                label="Tipo de cuenta"
                name="sellerType"
                value={formData.sellerType}
                icon={BadgeInfo}
                onChange={(e) => handleAccountTypeChange(e as SellerType)}
                options={[
                  { value: "PERSON", label: "Persona" },
                  { value: "STORE", label: "Tienda" },
                ]}
              />

              {/* Name Field */}
              <Input
                label={
                  formData.sellerType === "PERSON"
                    ? "Nombre"
                    : "Nombre de la tienda"
                }
                name="firstName"
                value={formData.firstName}
                onChange={handleFormData}
                type="text"
                icon={UserRound}
                placeholder={
                  formData.sellerType === "PERSON"
                    ? "Ingresa tu nombre"
                    : "Ingresa el nombre de la tienda"
                }
              />

              {/* LastName Field */}
              <Input
                label={"Apellido"}
                name="lastName"
                value={formData.lastName ?? ""}
                onChange={handleFormData}
                type="text"
                icon={UserRound}
                placeholder={"Ingresa tu apellido"}
              />

              {/* Email Field */}
              <Input
                label="Correo Electrónico"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                type="email"
                icon={Mail}
                placeholder="Ingresa tu correo electrónico"
              />

              {/* Password Field */}
              <Input
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                type="password"
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                icon={Lock}
                placeholder="Crea una contraseña"
              />

              {/* Confirm Password Field */}
              <Input
                label="Confirmar Contraseña"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormData}
                type="password"
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
                showPassword={showConfirmPassword}
                icon={Lock}
                placeholder="Repite tu contraseña"
              />

              {/* Submit Button */}
              <MainButton
                type="submit"
                isLoading={registerPersonLoading || registerStoreLoading}
                loadingText="Creando cuenta..."
                text="Registrarse"
                hasIcon
                icon={ArrowRight}
                variant="primary"
              />
            </form>
            <span className="block text-center text-sm text-gray-600 mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
