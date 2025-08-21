"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Eye, EyeOff, Lock } from "lucide-react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number";
  icon?: LucideIcon;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  name?: string;
  togglePasswordVisibility?: () => void;
  maxLength?: number;
  minLength?: number;
};

export default function Input({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  showPassword,
  togglePasswordVisibility,
  icon: Icon = Lock,
  maxLength = 50,
  minLength = 2,
}: Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <motion.div
          initial={false}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Icon
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "password" ? "text-primary" : "text-gray-400"
            }`}
          />
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            required
            minLength={minLength}
            maxLength={maxLength}
            className={clsx(
              "w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white",
              "placeholder:text-gray-400"
            )}
            placeholder={placeholder}
          />
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
