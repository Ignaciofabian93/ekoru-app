import { ChevronDown, LucideIcon } from "lucide-react";
import { Text } from "@/ui/text/text";
import clsx from "clsx";

type NavigationButtonProps = {
  openAccordion?: string | null;
  toggleAccordion?: (section: string) => void;
  redirect?: () => void;
  label: string;
  icon?: LucideIcon;
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
  const Icon: LucideIcon | undefined = icon;
  return (
    <button
      onClick={() => {
        if (toggleAccordion && section) toggleAccordion(section);
        if (redirect) redirect();
      }}
      className={clsx(
        "group",
        "w-full flex items-center justify-between",
        "p-3 text-left",
        "rounded-lg",
        "hover:bg-sidebar-navigationItem-lightHover/50",
        "dark:hover:bg-sidebar-navigationItem-darkHover/50",
        "transition-colors duration-300"
      )}
    >
      <div className="flex items-center">
        {Icon && <Icon className="h-5 w-5 mr-3 text-primary" />}
        <Text variant="label" className="font-medium group-hover:text-primary">
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
