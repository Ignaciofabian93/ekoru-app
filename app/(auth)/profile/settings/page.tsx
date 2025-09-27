"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Shield, Palette, Store, CreditCard } from "lucide-react";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import MainLayout from "@/ui/layout/mainLayout";
import ThemeAndPreferencesSettings from "./_ui/themeAndPreferences";
import NotificationsSettings from "./_ui/notifications";
import SecuritySettings from "./_ui/security";
import PaymentsSettings from "./_ui/payments";
import SubscriptionSettings from "./_ui/subscription";
import Container from "@/ui/layout/container";
import Grid from "@/ui/layout/grid";
import clsx from "clsx";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("theme");

  const sections = [
    { id: "theme", label: "Tema y Preferencias", icon: Palette },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "subscription", label: "Suscripción", icon: Store },
  ];

  return (
    <MainLayout>
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Title text="Configuración de la Cuenta" variant="h1" />
            <Text text="Personaliza tu experiencia, gestiona tu seguridad y configura tus preferencias" variant="p" />
          </div>

          <Grid className="grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map(({ icon, label, id }) => {
                  const Icon = icon;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={clsx(
                        "w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors",
                        {
                          "bg-primary text-text-50": activeSection === id,
                          "dark:text-text-100": activeSection !== id,
                        }
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-semibold">{label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="p-6">
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
              </div>
            </div>
          </Grid>
        </div>
      </Container>
    </MainLayout>
  );
}
