"use client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, ArrowRight, type LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
  text: string;
  hasIcon?: boolean;
  icon?: LucideIcon;
  variant?: "primary" | "destructive" | "outline" | "ghost" | "warning";
};

export default function MainButton({
  isLoading = false,
  type = "button",
  loadingText = "Cargando...",
  text,
  hasIcon = true,
  icon: Icon = ArrowRight,
  variant = "primary",
  onClick,
}: Props) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return "border-2 border-primary bg-gradient-to-r from-primary to-primary-dark text-white hover:brightness-110";
      case "destructive":
        return "border-2 border-error bg-error text-white hover:brightness-110";
      case "outline":
        return "border-2 border-primary text-primary bg-white hover:brightness-110";
      case "ghost":
        return "border-2 border-neutral text-neutral bg-white hover:brightness-110";
      case "warning":
        return "border-2 border-warning bg-warning text-white hover:brightness-110";
      default:
        return "border-2 bg-gradient-to-r from-primary to-primary-dark text-white hover:brightness-110";
    }
  };

  return (
    <motion.button
      type={type}
      disabled={isLoading}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "w-full min-w-[140px]",
        "py-3 px-4 rounded-lg font-medium shadow-md transition-all duration-200",
        "flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed",
        getVariantStyles(variant)
      )}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <span>{text}</span>
            {hasIcon && <Icon className="w-5 h-5" />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
