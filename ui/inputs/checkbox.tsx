"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function Checkbox({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  disabled = false,
  size = "md",
}: CheckboxProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={clsx(
            "relative rounded-md border-2 flex items-center justify-center transition-all duration-200",
            sizeClasses[size],
            checked ? "bg-primary border-primary" : "bg-white border-neutral/30 hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <Check size={iconSizes[size]} className="text-white" />
          </motion.div>
        </motion.button>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-medium text-text-primary cursor-pointer",
            disabled && "text-text-muted cursor-not-allowed"
          )}
        >
          {label}
        </label>
        {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
      </div>
    </div>
  );
}
