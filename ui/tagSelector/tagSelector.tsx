import { motion } from "motion/react";
import clsx from "clsx";
import { Plus, X } from "lucide-react";
import { Text } from "../text/text";

type Props = {
  interests: string[];
  isSubmitting?: boolean;
  tagInput: string;
  setTagInput: (tag: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
};

export default function TagSelector({
  interests,
  isSubmitting = false,
  tagInput,
  setTagInput,
  handleAddTag,
  handleRemoveTag,
}: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Intereses/Etiquetas (Opcional, máx. 3)
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
          className={clsx(
            "flex-1 px-4 py-2 border rounded-lg",
            "focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent",
            "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          placeholder="Ej: vintage, gaming, portátil..."
          disabled={isSubmitting || (interests || []).length >= 10}
          maxLength={20}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className={clsx(
            "px-6 py-2 rounded-lg font-medium transition-all duration-200",
            "bg-primary text-white hover:bg-primary-dark",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={isSubmitting || !tagInput.trim() || (interests || []).length >= 3}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {(interests || []).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {(interests || []).map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium",
                "bg-gradient-to-r from-lime-600 to-lime-800",
                "text-white"
              )}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500 transition-colors"
                disabled={isSubmitting}
                aria-label={`Eliminar etiqueta ${tag}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.span>
          ))}
        </div>
      )}
      {(interests || []).length > 0 && (
        <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
          {(interests || []).length}/3 etiquetas
        </Text>
      )}
    </motion.div>
  );
}
