import { ChevronDown, LucideIcon } from "lucide-react";
import { Text } from "@/ui/text/text";
import clsx from "clsx";

type NavigationButtonProps = {
  openAccordion?: string | null;
  toggleAccordion?: (section: string) => void;
  redirect?: () => void;
  label: string;
  icon: LucideIcon;
  section?: string;
};

export const NavigationButton = ({
  openAccordion,
  toggleAccordion,
  label,
  icon,
  section,
  redirect,
}: NavigationButtonProps) => {
  const Icon: LucideIcon = icon;
  return (
    <button
      onClick={() => {
        if (toggleAccordion && section) toggleAccordion(section);
        if (redirect) redirect();
      }}
      className={clsx(
        "w-full flex items-center justify-between",
        "p-3 text-left",
        "rounded-lg",
        "hover:bg-card-light-200 dark:hover:bg-card-dark-700",
        "transition-colors"
      )}
    >
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 text-primary" />
        <Text variant="label" className="font-medium">
          {label}
        </Text>
      </div>
      {section && (
        <ChevronDown
          className={clsx("h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200", {
            "rotate-180": openAccordion === section,
          })}
        />
      )}
    </button>
  );
};
