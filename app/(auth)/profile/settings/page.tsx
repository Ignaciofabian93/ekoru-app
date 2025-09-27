"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Palette, Store, Save, CreditCard } from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import MainButton from "@/ui/buttons/mainButton";
import ThemeAndPreferencesSettings from "./_ui/themeAndPreferences";
import NotificationsSettings from "./_ui/notifications";
import SecuritySettings from "./_ui/security";
import PaymentsSettings from "./_ui/payments";
import SubscriptionSettings from "./_ui/subscription";
import Container from "@/ui/layout/container";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("theme");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const sections = [
    { id: "theme", label: "Tema y Preferencias", icon: Palette },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "subscription", label: "Suscripción", icon: Store },
  ];

  return (
    <MainLayout>
      {/* <div className="min-h-screen bg-neutral-light/10"> */}
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-inverse mb-2">
              Configuración
            </h1>
            <p className="text-text-muted dark:text-text-muted text-lg">
              Personaliza tu experiencia, gestiona tu seguridad y configura tus preferencias
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-white"
                          : "text-text-primary dark:text-text-inverse hover:bg-neutral-light/20 dark:hover:bg-neutral-dark/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span>{section.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-background-dark-container rounded-xl shadow-sm border border-neutral/20 dark:border-neutral-dark/30 p-6">
                {/* Theme & Preferences Section */}
                {activeSection === "theme" && <ThemeAndPreferencesSettings />}

                {/* Notifications Section */}
                {activeSection === "notifications" && <NotificationsSettings />}

                {/* Security Section */}
                {activeSection === "security" && <SecuritySettings />}

                {/* Payments Section */}
                {activeSection === "payments" && <PaymentsSettings />}

                {/* Subscription Section */}
                {activeSection === "subscription" && <SubscriptionSettings />}

                {/* Save Button */}
                <div className="flex justify-end mt-8 pt-6 border-t border-neutral/20">
                  <MainButton
                    text="Guardar Cambios"
                    icon={Save}
                    onClick={handleSave}
                    isLoading={isLoading}
                    loadingText="Guardando..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* </div> */}
    </MainLayout>
  );
}
