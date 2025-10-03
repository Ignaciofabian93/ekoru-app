import { X } from "lucide-react";
import { Title } from "@/ui/text/title";
import clsx from "clsx";

export const SideBarHeader = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4",
        "border-b border-neutral-200 dark:border-neutral-700",
        "bg-container-light-50 dark:bg-container-dark-900"
      )}
    >
      <Title variant="h4" className="font-semibold m-0">
        Menú
      </Title>
      <button
        onClick={closeMobileMenu}
        className={clsx(
          "p-2 text-title-700 dark:text-title-200",
          "transition-colors duration-200",
          "rounded-lg",
          "hover:text-primary",
          "hover:bg-primary/10"
        )}
        aria-label="Close menu"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
