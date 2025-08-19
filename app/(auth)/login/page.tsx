"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Input from "@/ui/inputs/input";
import MainButton from "@/ui/buttons/mainButton";
import Link from "next/link";

export default function LoginPage() {
  // const { login, formData, handleFormData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await login();
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            Bienvenido
          </h1>
          <p className="text-gray-600">Ingresa a tu cuenta</p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <Input
                label="Correo Electrónico"
                value=""
                onChange={() => {}}
                type="email"
                icon={Mail}
                placeholder="Ingresa tu correo electrónico"
              />

              {/* Password Field */}
              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value=""
                onChange={() => {}}
                type="password"
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                icon={Lock}
              />

              {/* Submit Button */}
              <MainButton
                isLoading={isLoading}
                loadingText="Iniciando sesión..."
                text="Entrar"
                hasIcon
                icon={ArrowRight}
                variant="primary"
              />
            </form>
            <span className="block text-center text-sm text-gray-600 mt-4">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
