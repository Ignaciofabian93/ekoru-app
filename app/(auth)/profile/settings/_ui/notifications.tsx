import { motion } from "motion/react";
import Checkbox from "@/ui/inputs/checkbox";
import { Bell } from "lucide-react";
import { useState } from "react";

type NotificationSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  communityUpdates: boolean;
  securityAlerts: boolean;
  weeklyDigest: boolean;
};

export default function NotificationsSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    communityUpdates: true,
    securityAlerts: true,
    weeklyDigest: true,
  });
  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Bell className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Notificaciones</h2>
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
      </div>
    </motion.div>
  );
}
