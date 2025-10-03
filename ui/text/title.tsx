type Title = {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
};

export const Title = ({ children, variant = "h1", className }: Title) => {
  const getVariantStyle = (variant: string) => {
    switch (variant) {
      case "h1":
        return "text-3xl md:text-4xl";
      case "h2":
        return "text-2xl md:text-3xl";
      case "h3":
        return "text-xl md:text-2xl";
      case "h4":
        return "text-lg md:text-xl";
      case "h5":
        return "text-base md:text-lg";
      case "h6":
        return "text-sm md:text-base";
    }
  };
  const Heading = variant;
  return (
    <Heading className={`${getVariantStyle(variant)} font-bold text-title-900 dark:text-title-100 ${className}`}>
      {children}
    </Heading>
  );
};
