"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

// Main Card Component
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={clsx(
        "bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200",
        "border border-gray-100 overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Card Header
export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={clsx("p-6 pb-4", className)}>{children}</div>;
}

// Card Title
export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={clsx("text-xl font-semibold text-gray-900 mb-2", className)}>
      {children}
    </h3>
  );
}

// Card Description
export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={clsx("text-gray-600 text-sm leading-relaxed", className)}>
      {children}
    </p>
  );
}

// Card Content
export function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx("px-6", className)}>{children}</div>;
}

// Card Footer
export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={clsx("p-6 pt-4", className)}>{children}</div>;
}
