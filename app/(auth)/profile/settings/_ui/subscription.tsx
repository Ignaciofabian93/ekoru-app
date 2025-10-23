import MainButton from "@/ui/buttons/mainButton";
import Checkbox from "@/ui/inputs/checkbox";
import { Store } from "lucide-react";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PersonSubscriptionPlan, BusinessSubscriptionPlan } from "@/types/enums";

type SubscriptionSettingsType = {
  accountType: PersonSubscriptionPlan | BusinessSubscriptionPlan;
  subscriptionStatus: "active" | "inactive" | "cancelled";
  nextBillingDate: string;
  autoRenew: boolean;
};
const initialSubscriptionSettings: SubscriptionSettingsType = {
  accountType: "FREEMIUM",
  subscriptionStatus: "active",
  nextBillingDate: "2024-12-01T00:00:00Z",
  autoRenew: true,
};
export const settings = initialSubscriptionSettings;

export default function SubscriptionSettings() {
  const [settings, setSettings] = useState<SubscriptionSettingsType>(initialSubscriptionSettings);
  const updateSettings = (key: keyof SubscriptionSettingsType, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
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
              {settings.accountType === "FREEMIUM"
                ? "Gratuito"
                : settings.accountType === "ADVANCED"
                ? "Plus"
                : "Premium"}
            </h3>
            <p className="text-white/80 mb-1">
              Estado: {settings.subscriptionStatus === "active" ? "Activo" : "Inactivo"}
            </p>
            {settings.accountType !== "FREEMIUM" && (
              <p className="text-white/80 text-sm">
                Próxima facturación: {new Date(settings.nextBillingDate).toLocaleDateString()}
              </p>
            )}
          </div>
          {settings.accountType === "FREEMIUM" && (
            <MainButton text="Mejorar Plan" variant="outline" onClick={() => {}} />
          )}
        </div>
      </div>

      {settings.accountType !== "FREEMIUM" && (
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
            <MainButton text="Cancelar Suscripción" icon={Trash2} variant="destructive" onClick={() => {}} />
          </div>
        </div>
      )}

      <div className="bg-neutral-light/20 p-4 rounded-lg">
        <h4 className="font-medium text-text-primary mb-2">Características de tu plan:</h4>
        <ul className="text-text-muted text-sm space-y-1">
          {settings.accountType === "FREEMIUM" && (
            <>
              <li>• Hasta 5 productos publicados</li>
              <li>• Comisión del 5% por venta</li>
              <li>• Soporte básico por email</li>
            </>
          )}
          {settings.accountType === "ADVANCED" && (
            <>
              <li>• Hasta 50 productos publicados</li>
              <li>• Comisión del 3% por venta</li>
              <li>• Soporte prioritario</li>
              <li>• Estadísticas avanzadas</li>
            </>
          )}
          {settings.accountType === "EXPERT" && (
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
  );
}
