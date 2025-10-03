import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type Icon = {
  icon: LucideIcon;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function Icon({ icon, onClick, ariaLabel }: Icon) {
  const IconComponent = icon;
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "p-2",
        "text-icon-light",
        "dark:text-icon-dark",
        "transition-colors duration-200",
        "hover:text-icon-hover",
        "dark:hover:text-icon-hover"
      )}
    >
      <IconComponent className="w-5 h-5" />
    </button>
  );
}
