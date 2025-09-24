import Checkbox from "@/ui/inputs/checkbox";
import Select from "@/ui/inputs/select";
import { Palette } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeSettings() {
  return (
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
                settings.theme === theme ? "border-primary bg-primary/10" : "border-neutral/30 hover:border-primary/50"
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
  );
}
