import Checkbox from "@/ui/inputs/checkbox";
import Input from "@/ui/inputs/input";
import Select from "@/ui/inputs/select";
import { CreditCard } from "lucide-react";
import { Globe, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type PaymentsSettingsType = {
  defaultPaymentMethod: string;
  autoSaveCards: boolean;
  invoiceEmails: boolean;
  billingAddress: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
};
const paymentMethods = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "MasterCard" },
  { value: "paypal", label: "PayPal" },
  { value: "amex", label: "American Express" },
];
export const initialPaymentsSettings: PaymentsSettingsType = {
  defaultPaymentMethod: "visa",
  autoSaveCards: true,
  invoiceEmails: false,
  billingAddress: {
    street: "",
    city: "",
    country: "",
    zipCode: "",
  },
};

export default function PaymentsSettings() {
  const [settings, setSettings] = useState<PaymentsSettingsType>(initialPaymentsSettings);
  const updateSettings = (
    key: keyof PaymentsSettingsType,
    value: boolean | string | PaymentsSettingsType["billingAddress"]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
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
  );
}
