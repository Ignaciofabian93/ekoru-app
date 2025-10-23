"use client";
import { motion } from "framer-motion";
import { Mail, Lock, UserRound, ArrowRight, BadgeInfo } from "lucide-react";
import { SellerType } from "@/types/enums";
import Image from "next/image";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import MainButton from "@/ui/buttons/mainButton";
import Link from "next/link";
import useRegister, { RegisterPerson, RegisterBusiness } from "./_hooks/useRegister";
import { validateEmail } from "@/utils/regexValidations";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";

export default function RegisterPage() {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    registerPersonLoading,
    registerBusinessLoading,
    handleFormData,
    handleAccountTypeChange,
    handleBusinessTypeChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  } = useRegister();

  const userDictionary = {
    PERSON: {
      label1: "Nombre",
      label2: "Apellido",
      placeholder1: "Ingresa tu nombre",
      placeholder2: "Ingresa tu apellido",
      input1: "firstName",
      input2: "lastName",
    },
    STARTUP: {
      label1: "Nombre del negocio",
      label2: "Razón social (opcional)",
      placeholder1: "Ingresa el nombre del negocio",
      input1: "businessName",
      input2: "businessName",
    },
    COMPANY: {
      label1: "Nombre del negocio",
      label2: "Razón social (opcional)",
      placeholder1: "Ingresa el nombre del negocio",
      input1: "businessName",
      input2: "businessName",
    },
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
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
          className="text-center mb-8 mt-10"
        >
          <div className="w-auto h-[80px] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Image src={"/brand/logo.webp"} alt="EKORU" width={800} height={400} className="w-auto h-full" priority />
          </div>
          <Title variant="h2" className="font-bold mb-2">
            Crear cuenta
          </Title>
          <Text variant="p">Regístrate para comenzar</Text>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 py-6">
            <form id="register-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type Selector */}
              <Select
                label="Tipo de cuenta"
                name="sellerType"
                value={formData.sellerType}
                icon={BadgeInfo}
                onChange={(e) => handleAccountTypeChange(e as SellerType)}
                options={[
                  { value: "PERSON", label: "Persona" },
                  { value: "STARTUP", label: "Emprendimiento" },
                  { value: "COMPANY", label: "Empresa" },
                ]}
                searchEnabled={false}
              />

              {formData.sellerType !== "PERSON" && (
                <Select
                  label="Tipo de negocio"
                  name="businessType"
                  value={(formData as RegisterBusiness).businessType}
                  onChange={handleBusinessTypeChange}
                  options={[
                    { value: "RETAIL", label: "Retail" },
                    { value: "SERVICES", label: "Servicios" },
                    { value: "MIXED", label: "Mixto" },
                  ]}
                />
              )}

              {/* Name Field */}
              <Input
                label={userDictionary[formData.sellerType].label1}
                name={userDictionary[formData.sellerType].input1}
                value={
                  formData.sellerType === "PERSON"
                    ? (formData as RegisterPerson).firstName ?? ""
                    : (formData as RegisterBusiness).businessName ?? ""
                }
                onChange={handleFormData}
                type="text"
                icon={UserRound}
                placeholder={userDictionary[formData.sellerType].placeholder1}
                minLength={2}
                maxLength={80}
              />

              {/* LastName Field */}
              {formData.sellerType === "PERSON" && (
                <Input
                  label={userDictionary[formData.sellerType].label2}
                  name={userDictionary[formData.sellerType].input2}
                  value={(formData as RegisterPerson).lastName ?? ""}
                  onChange={handleFormData}
                  type="text"
                  icon={UserRound}
                  placeholder={userDictionary[formData.sellerType].placeholder2}
                  required={false}
                  minLength={2}
                  maxLength={100}
                />
              )}

              {/* Email Field */}
              <Input
                label="Correo Electrónico"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                type="email"
                icon={Mail}
                placeholder="Ingresa tu correo electrónico"
                minLength={5}
                maxLength={50}
                isInvalid={formData.email.length > 0 && !validateEmail(formData.email)}
                errorMessage="Por favor, ingresa un correo electrónico válido."
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
                isInvalid={formData.password !== formData.confirmPassword && formData.confirmPassword.length > 0}
                errorMessage="Las contraseñas no coinciden."
              />
            </form>

            {/* Submit Button */}
            <div className="mt-8">
              <MainButton
                type="submit"
                form="register-form"
                isLoading={registerPersonLoading || registerBusinessLoading}
                loadingText="Creando cuenta..."
                text="Registrarse"
                hasIcon
                icon={ArrowRight}
                variant="primary"
              />
            </div>
            <Text variant="span" className="block text-center mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </Text>
            <Text variant="span" className="block text-center mt-4">
              <Link href="/feed" className="text-primary hover:underline">
                Regresar a la página principal
              </Link>
            </Text>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
