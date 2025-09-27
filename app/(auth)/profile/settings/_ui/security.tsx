import Checkbox from "@/ui/inputs/checkbox";
import Select from "@/ui/inputs/select";
import { Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import MainButton from "@/ui/buttons/mainButton";

type SecuritySettingsType = {
  passwordLastChanged: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
};
const sessionTimeouts = [
  { value: 15, label: "15 minutos" },
  { value: 30, label: "30 minutos" },
  { value: 60, label: "1 hora" },
  { value: 120, label: "2 horas" },
  { value: -1, label: "Nunca" },
];

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettingsType>({
    passwordLastChanged: "2023-10-01T12:00:00Z",
    twoFactorEnabled: false,
    sessionTimeout: 60,
    loginNotifications: true,
  });
  const updateSettings = (key: keyof SecuritySettingsType, value: boolean | number | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
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
  );
}
