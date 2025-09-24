"use client";
import { useState } from "react";
import MainLayout from "@/ui/layout/mainLayout";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import Checkbox from "@/ui/inputs/checkbox";
import MainButton from "@/ui/buttons/mainButton";
import { Bell, Lock, Globe, Shield, Palette, Store, Save, MapPin, CreditCard, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { AccountType } from "@/types/enums";

type UserSettings = {
  // Theme Preferences
  theme: "light" | "dark" | "system";
  language: string;
  currency: string;
  reducedMotion: boolean;
  compactView: boolean;

  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  communityUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;

  // Security
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;

  // Payments
  defaultPaymentMethod: string;
  autoSaveCards: boolean;
  billingAddress: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  invoiceEmails: boolean;

  // Subscription
  accountType: AccountType;
  subscriptionStatus: "active" | "inactive" | "cancelled";
  nextBillingDate: string;
  autoRenew: boolean;
};

const languages = [
  { label: "Español", value: "es" },
  { label: "English", value: "en" },
  { label: "Português", value: "pt" },
  { label: "Français", value: "fr" },
];

const currencies = [
  { label: "USD - Dólar Estadounidense", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "COP - Peso Colombiano", value: "COP" },
  { label: "MXN - Peso Mexicano", value: "MXN" },
];

const sessionTimeouts = [
  { label: "15 minutos", value: 15 },
  { label: "30 minutos", value: 30 },
  { label: "1 hora", value: 60 },
  { label: "2 horas", value: 120 },
  { label: "Nunca", value: -1 },
];

const paymentMethods = [
  { label: "Tarjeta de Crédito", value: "credit_card" },
  { label: "PayPal", value: "paypal" },
  { label: "Transferencia Bancaria", value: "bank_transfer" },
  { label: "Billetera Digital", value: "digital_wallet" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    // Theme Preferences
    theme: "system",
    language: "es",
    currency: "USD",
    reducedMotion: false,
    compactView: false,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    communityUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
    securityAlerts: true,

    // Security
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 60,
    passwordLastChanged: "2024-08-15",

    // Payments
    defaultPaymentMethod: "credit_card",
    autoSaveCards: true,
    billingAddress: {
      street: "Calle 123 #45-67",
      city: "Bogotá",
      country: "Colombia",
      zipCode: "110111",
    },
    invoiceEmails: true,

    // Subscription
    accountType: "FREE" as AccountType,
    subscriptionStatus: "active",
    nextBillingDate: "2024-10-15",
    autoRenew: true,
  });

  const [activeSection, setActiveSection] = useState("theme");
  const [isLoading, setIsLoading] = useState(false);

  const updateSettings = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

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
      <div className="min-h-screen bg-neutral-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">Configuración</h1>
            <p className="text-text-muted text-lg">
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
                          : "text-text-primary hover:bg-neutral-light/20"
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
              <div className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
                {/* Theme & Preferences Section */}
                {activeSection === "theme" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Palette className="text-primary" size={24} />
                      <h2 className="text-2xl font-semibold text-text-primary">Tema y Preferencias</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-4">Tema de la Aplicación</label>
                      <div className="grid grid-cols-3 gap-4">
                        {["light", "dark", "system"].map((theme) => (
                          <motion.button
                            key={theme}
                            onClick={() => updateSettings("theme", theme as "light" | "dark" | "system")}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${
                              settings.theme === theme
                                ? "border-primary bg-primary/10"
                                : "border-neutral/30 hover:border-primary/50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-sm font-medium text-text-primary capitalize">
                              {theme === "light" ? "Claro" : theme === "dark" ? "Oscuro" : "Sistema"}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Idioma"
                        value={settings.language}
                        onChange={(value) => updateSettings("language", value as string)}
                        options={languages}
                        icon={Globe}
                      />
                      <Select
                        label="Moneda"
                        value={settings.currency}
                        onChange={(value) => updateSettings("currency", value as string)}
                        options={currencies}
                        icon={CreditCard}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text-primary">Opciones de Accesibilidad</h3>
                      <div className="space-y-4">
                        <Checkbox
                          id="reducedMotion"
                          name="reducedMotion"
                          label="Reducir movimiento"
                          description="Minimiza animaciones y transiciones para una experiencia más estática"
                          checked={settings.reducedMotion}
                          onChange={(checked) => updateSettings("reducedMotion", checked)}
                        />
                        <Checkbox
                          id="compactView"
                          name="compactView"
                          label="Vista compacta"
                          description="Muestra más información en menos espacio"
                          checked={settings.compactView}
                          onChange={(checked) => updateSettings("compactView", checked)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notifications Section */}
                {activeSection === "notifications" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Bell className="text-primary" size={24} />
                      <h2 className="text-2xl font-semibold text-text-primary">Notificaciones</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">Canales de Notificación</h3>
                        <div className="space-y-4">
                          <Checkbox
                            id="emailNotifications"
                            name="emailNotifications"
                            label="Notificaciones por email"
                            description="Recibir notificaciones importantes por correo electrónico"
                            checked={settings.emailNotifications}
                            onChange={(checked) => updateSettings("emailNotifications", checked)}
                          />
                          <Checkbox
                            id="pushNotifications"
                            name="pushNotifications"
                            label="Notificaciones push"
                            description="Recibir notificaciones en tiempo real en el navegador"
                            checked={settings.pushNotifications}
                            onChange={(checked) => updateSettings("pushNotifications", checked)}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">Tipos de Notificación</h3>
                        <div className="space-y-4">
                          <Checkbox
                            id="orderUpdates"
                            name="orderUpdates"
                            label="Actualizaciones de pedidos"
                            description="Notificaciones sobre el estado de tus compras y ventas"
                            checked={settings.orderUpdates}
                            onChange={(checked) => updateSettings("orderUpdates", checked)}
                          />
                          <Checkbox
                            id="communityUpdates"
                            name="communityUpdates"
                            label="Actualizaciones de la comunidad"
                            description="Noticias y actualizaciones de la comunidad Ekoru"
                            checked={settings.communityUpdates}
                            onChange={(checked) => updateSettings("communityUpdates", checked)}
                          />
                          <Checkbox
                            id="securityAlerts"
                            name="securityAlerts"
                            label="Alertas de seguridad"
                            description="Notificaciones sobre actividad sospechosa en tu cuenta"
                            checked={settings.securityAlerts}
                            onChange={(checked) => updateSettings("securityAlerts", checked)}
                          />
                          <Checkbox
                            id="weeklyDigest"
                            name="weeklyDigest"
                            label="Resumen semanal"
                            description="Resumen de actividad y productos destacados"
                            checked={settings.weeklyDigest}
                            onChange={(checked) => updateSettings("weeklyDigest", checked)}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-text-primary mb-4">Marketing</h3>
                        <div className="space-y-4">
                          <Checkbox
                            id="promotionalEmails"
                            name="promotionalEmails"
                            label="Emails promocionales"
                            description="Ofertas especiales y descuentos exclusivos"
                            checked={settings.promotionalEmails}
                            onChange={(checked) => updateSettings("promotionalEmails", checked)}
                          />
                          <Checkbox
                            id="marketingEmails"
                            name="marketingEmails"
                            label="Marketing por email"
                            description="Información sobre nuevos productos y servicios"
                            checked={settings.marketingEmails}
                            onChange={(checked) => updateSettings("marketingEmails", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Security Section */}
                {activeSection === "security" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Shield className="text-primary" size={24} />
                      <h2 className="text-2xl font-semibold text-text-primary">Seguridad</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-neutral-light/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-text-primary">Contraseña</h3>
                            <p className="text-text-muted text-sm">
                              Última actualización: {new Date(settings.passwordLastChanged).toLocaleDateString()}
                            </p>
                          </div>
                          <MainButton text="Cambiar" icon={Lock} variant="outline" onClick={() => {}} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-text-primary">Autenticación</h3>
                        <Checkbox
                          id="twoFactorEnabled"
                          name="twoFactorEnabled"
                          label="Autenticación de dos factores"
                          description="Agregar una capa extra de seguridad a tu cuenta"
                          checked={settings.twoFactorEnabled}
                          onChange={(checked) => updateSettings("twoFactorEnabled", checked)}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-text-primary">Sesiones</h3>
                        <Select
                          label="Tiempo de sesión"
                          value={settings.sessionTimeout}
                          onChange={(value) => updateSettings("sessionTimeout", value as number)}
                          options={sessionTimeouts}
                          icon={Lock}
                        />
                        <Checkbox
                          id="loginNotifications"
                          name="loginNotifications"
                          label="Notificaciones de inicio de sesión"
                          description="Recibir alertas cuando alguien inicie sesión en tu cuenta"
                          checked={settings.loginNotifications}
                          onChange={(checked) => updateSettings("loginNotifications", checked)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Payments Section */}
                {activeSection === "payments" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <CreditCard className="text-primary" size={24} />
                      <h2 className="text-2xl font-semibold text-text-primary">Métodos de Pago</h2>
                    </div>

                    <Select
                      label="Método de Pago Predeterminado"
                      value={settings.defaultPaymentMethod}
                      onChange={(value) => updateSettings("defaultPaymentMethod", value as string)}
                      options={paymentMethods}
                      icon={CreditCard}
                    />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text-primary">Configuración de Pagos</h3>
                      <div className="space-y-4">
                        <Checkbox
                          id="autoSaveCards"
                          name="autoSaveCards"
                          label="Guardar tarjetas automáticamente"
                          description="Guardar información de tarjetas para compras futuras"
                          checked={settings.autoSaveCards}
                          onChange={(checked) => updateSettings("autoSaveCards", checked)}
                        />
                        <Checkbox
                          id="invoiceEmails"
                          name="invoiceEmails"
                          label="Enviar facturas por email"
                          description="Recibir copias de facturas y recibos por correo electrónico"
                          checked={settings.invoiceEmails}
                          onChange={(checked) => updateSettings("invoiceEmails", checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text-primary">Dirección de Facturación</h3>
                      <div className="space-y-4">
                        <Input
                          label="Dirección"
                          value={settings.billingAddress.street}
                          onChange={(e) =>
                            updateSettings("billingAddress", {
                              ...settings.billingAddress,
                              street: (e.target as HTMLInputElement).value,
                            })
                          }
                          icon={MapPin}
                          placeholder="Calle 123 #45-67"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Ciudad"
                            value={settings.billingAddress.city}
                            onChange={(e) =>
                              updateSettings("billingAddress", {
                                ...settings.billingAddress,
                                city: (e.target as HTMLInputElement).value,
                              })
                            }
                            icon={MapPin}
                            placeholder="Tu ciudad"
                          />
                          <Input
                            label="Código Postal"
                            value={settings.billingAddress.zipCode}
                            onChange={(e) =>
                              updateSettings("billingAddress", {
                                ...settings.billingAddress,
                                zipCode: (e.target as HTMLInputElement).value,
                              })
                            }
                            icon={MapPin}
                            placeholder="110111"
                          />
                        </div>
                        <Input
                          label="País"
                          value={settings.billingAddress.country}
                          onChange={(e) =>
                            updateSettings("billingAddress", {
                              ...settings.billingAddress,
                              country: (e.target as HTMLInputElement).value,
                            })
                          }
                          icon={Globe}
                          placeholder="Colombia"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Subscription Section */}
                {activeSection === "subscription" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Store className="text-primary" size={24} />
                      <h2 className="text-2xl font-semibold text-text-primary">Suscripción</h2>
                    </div>

                    <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            Plan{" "}
                            {settings.accountType === "FREE"
                              ? "Gratuito"
                              : settings.accountType === "PLUS"
                              ? "Plus"
                              : "Premium"}
                          </h3>
                          <p className="text-white/80 mb-1">
                            Estado: {settings.subscriptionStatus === "active" ? "Activo" : "Inactivo"}
                          </p>
                          {settings.accountType !== "FREE" && (
                            <p className="text-white/80 text-sm">
                              Próxima facturación: {new Date(settings.nextBillingDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {settings.accountType === "FREE" && (
                          <MainButton text="Mejorar Plan" variant="outline" onClick={() => {}} />
                        )}
                      </div>
                    </div>

                    {settings.accountType !== "FREE" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-text-primary">Configuración de Suscripción</h3>
                        <Checkbox
                          id="autoRenew"
                          name="autoRenew"
                          label="Renovación automática"
                          description="Renovar automáticamente tu suscripción cuando expire"
                          checked={settings.autoRenew}
                          onChange={(checked) => updateSettings("autoRenew", checked)}
                        />

                        <div className="flex space-x-4 pt-4">
                          <MainButton text="Cambiar Plan" icon={Store} variant="outline" onClick={() => {}} />
                          <MainButton
                            text="Cancelar Suscripción"
                            icon={Trash2}
                            variant="destructive"
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    )}

                    <div className="bg-neutral-light/20 p-4 rounded-lg">
                      <h4 className="font-medium text-text-primary mb-2">Características de tu plan:</h4>
                      <ul className="text-text-muted text-sm space-y-1">
                        {settings.accountType === "FREE" && (
                          <>
                            <li>• Hasta 5 productos publicados</li>
                            <li>• Comisión del 5% por venta</li>
                            <li>• Soporte básico por email</li>
                          </>
                        )}
                        {settings.accountType === "PLUS" && (
                          <>
                            <li>• Hasta 50 productos publicados</li>
                            <li>• Comisión del 3% por venta</li>
                            <li>• Soporte prioritario</li>
                            <li>• Estadísticas avanzadas</li>
                          </>
                        )}
                        {settings.accountType === "PREMIUM" && (
                          <>
                            <li>• Productos ilimitados</li>
                            <li>• Comisión del 1% por venta</li>
                            <li>• Soporte 24/7</li>
                            <li>• Estadísticas completas</li>
                            <li>• Promoción destacada</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}

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
      </div>
    </MainLayout>
  );
}
