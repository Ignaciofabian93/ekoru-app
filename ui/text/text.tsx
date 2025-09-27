import clsx from "clsx";

type Text = {
  className?: string;
  text: string;
  variant?: "p" | "span" | "label" | "blockquote";
};

export const Text = ({ className, text, variant = "p" }: Text) => {
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
    <Tag className={clsx("text-text-800 dark:text-text-100", className, getTextVariantStyle(variant))}>{text}</Tag>
  );
};
