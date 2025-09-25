import { useTheme } from "@/providers/theme";
import { Palette } from "lucide-react";
import { motion } from "motion/react";
import ThemeDebug from "./themeDebug";

export default function ThemeAndPreferencesSettings() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Palette className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Tema y Preferencias</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-text-inverse mb-4">
          Tema de la Aplicación
        </label>
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "system"].map((t) => (
            <motion.button
              key={t}
              onClick={() => setTheme(t as "light" | "dark" | "system")}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                theme === t
                  ? "border-primary bg-primary/10 dark:bg-primary/20"
                  : "border-neutral/30 hover:border-primary/50 dark:border-neutral-dark/50 dark:hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm font-medium text-text-primary dark:text-text-inverse capitalize">
                {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Sistema"}
              </div>
              <div className="text-xs text-text-muted dark:text-text-muted mt-1">
                {t === "light" && "🌞"}
                {t === "dark" && "🌙"}
                {t === "system" && "⚙️"}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ThemeDebug />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div> */}
    </motion.div>
  );
}
