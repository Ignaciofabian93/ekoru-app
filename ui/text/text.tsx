import clsx from "clsx";

type Text = {
  className?: string;
  variant?: "p" | "span" | "label" | "blockquote";
  children: React.ReactNode;
};

export const Text = ({ className, variant = "p", children }: Text) => {
  const getTextVariantStyle = (variant: string) => {
    switch (variant) {
      case "p":
        return "text-base";
      case "span":
        return "text-sm";
      case "label":
        return "text-sm font-medium";
      case "blockquote":
        return "text-base italic";
    }
  };
  const Tag = variant;
  return (
    <Tag className={clsx("text-text-800 dark:text-text-100", className, getTextVariantStyle(variant))}>{children}</Tag>
  );
};
