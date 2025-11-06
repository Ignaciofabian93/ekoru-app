import { Text } from "@/ui/text/text";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CategoryButton = ({
  onClick,
  name,
  id,
  section,
  href,
  closeMobileMenu,
}: {
  onClick: () => void;
  name: string;
  id: number;
  section: number | null;
  href?: string;
  closeMobileMenu?: () => void;
}) => {
  const handleAccordionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  const handleLinkClick = () => {
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <div className="flex items-center w-full">
      {/* Category name as clickable link - takes most of the space */}
      {href ? (
        <Link
          href={href}
          onClick={handleLinkClick}
          className="flex-1 p-3 pl-4 text-left hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-200 group min-h-[48px] flex items-center"
        >
          <Text variant="label" className="font-medium group-hover:text-primary">
            {name}
          </Text>
        </Link>
      ) : (
        <div className="flex-1 p-3 pl-4 min-h-[48px] flex items-center">
          <Text variant="label" className="font-medium">
            {name}
          </Text>
        </div>
      )}

      {/* Accordion expand/collapse button - only the chevron arrow */}
      <button
        onClick={handleAccordionClick}
        className="flex items-center justify-center p-3 pr-4 hover:bg-primary/10 transition-all duration-200 group min-w-[48px] min-h-[48px]"
        title={section === id ? "Cerrar subcategorías" : "Ver subcategorías"}
      >
        <ChevronRight
          className={`h-5 w-5 text-text-500 dark:text-text-400 group-hover:text-primary transition-all duration-200 ${
            section === id ? "rotate-90" : ""
          }`}
        />
      </button>
    </div>
  );
};
