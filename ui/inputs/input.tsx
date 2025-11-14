"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Eye, EyeOff, Lock } from "lucide-react";
import clsx from "clsx";
import { Text } from "../text/text";

type Props = React.HTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "search";
  icon?: LucideIcon;
  hasIcon?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  name?: string;
  togglePasswordVisibility?: () => void;
  maxLength?: number;
  minLength?: number;
  size?: "sm" | "md" | "lg" | "full";
  isInvalid?: boolean;
  errorMessage?: string;
  required?: boolean;
};

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  showPassword,
  togglePasswordVisibility,
  icon: Icon = Lock,
  hasIcon = true,
  maxLength = 50,
  minLength = 2,
  size = "full",
  isInvalid = false,
  errorMessage,
  required = false,
}: Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sizeClass = {
    sm: "w-1/3",
    md: "w-1/2",
    lg: "w-2/3",
    full: "w-full",
  }[size];

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div
      className={clsx(
        {
          "space-y-2": !!label,
        },
        sizeClass
      )}
    >
      <Text variant="label" htmlFor={name} className="font-medium">
        {label}
      </Text>
      <div className="relative">
        <motion.div initial={false} transition={{ duration: 0.2 }} className="relative">
          {hasIcon && Icon && (
            <Icon
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                focusedField === name ? "text-primary" : "text-gray-400"
              }`}
            />
          )}
          <input
            id={id || name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name || "input")}
            onBlur={() => setFocusedField(null)}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            className={clsx(
              "w-full pr-12 py-3",
              "border border-gray-300",
              "rounded-lg outline-0",
              "transition-all duration-200",
              "bg-input-light-50 focus:bg-white",
              "focus:ring-1 focus:ring-primary focus:border-primary",
              "dark:bg-input-dark-800 dark:focus:bg-input-dark-900",
              "placeholder:text-gray-400",
              {
                "pl-3": !hasIcon,
                "pl-10": hasIcon,
                "border-red-600 focus:ring-red-600 focus:border-red-600": isInvalid,
              }
            )}
            placeholder={placeholder}
          />
          {isInvalid && <p className="absolute text-xs text-red-600">{errorMessage}</p>}
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.div
                    key="eye-off"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EyeOff className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
