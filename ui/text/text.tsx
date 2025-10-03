import clsx from "clsx";

type Text = {
  className?: string;
  variant?: "p" | "span" | "label" | "blockquote" | "small";
  children: React.ReactNode;
  colorClass?: string; // Optional: for predefined color schemes
};

export const Text = ({ className, variant = "p", children, colorClass }: Text) => {
  const getTextVariantStyle = (variant: string) => {
    switch (variant) {
      case "p":
        return "text-base";
      case "span":
        return "text-sm";
      case "label":
        return "text-sm";
      case "small":
        return "text-xs";
      case "blockquote":
        return "text-base italic";
    }
  };

  // Default colors - only applied if no color classes are provided in className or colorClass
  const defaultColors = "text-text-800 dark:text-text-100";

  // Check if className contains color-related classes (including group hover)
  const hasColorInClassName =
    className && /text-|hover:text-|focus:text-|active:text-|group-hover:text-/.test(className);

  const Tag = variant;
  return (
    <Tag
      className={clsx(
        // Apply default colors only if no color class is provided
        !hasColorInClassName && !colorClass && defaultColors,
        // Apply optional colorClass prop
        colorClass,
        // Apply variant styles
        getTextVariantStyle(variant),
        // Apply custom className (this will override defaults if it contains color classes)
        className
      )}
    >
      {children}
    </Tag>
  );
};
