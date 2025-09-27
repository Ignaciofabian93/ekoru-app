import { useTheme } from "@/providers/theme";
import { Flag, Palette } from "lucide-react";
import { motion } from "motion/react";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import clsx from "clsx";
import Select from "@/ui/inputs/select";

const languageOptions = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
  { value: "fr", label: "Francés" },
];

export default function ThemeAndPreferencesSettings() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Palette className="text-primary" size={24} />
        <Title text="Tema e Idioma" variant="h3" />
      </div>

      <div className="space-y-2">
        <Text text="Tema de la Aplicación" variant="label" />
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "system"].map((t) => (
            <motion.button
              key={t}
              onClick={() => setTheme(t as "light" | "dark" | "system")}
              className={clsx("p-4 rounded-lg border-2 text-center transition-all", {
                "border-primary bg-primary/20 dark:bg-primary/10": theme === t,
                "border-neutral-300 hover:border-primary/50 dark:border-neutral-100 dark:hover:border-primary/50":
                  theme !== t,
              })}
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

      <div className="space-y-2">
        <Text text="Idioma de la aplicación" variant="label" />
        <Select
          icon={Flag}
          options={languageOptions}
          value={languageOptions[0].value}
          onChange={(value) => console.log(value)}
          readOnly
        />
      </div>
    </motion.div>
  );
}
