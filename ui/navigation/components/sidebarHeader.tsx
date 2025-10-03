import { X } from "lucide-react";
import { Title } from "@/ui/text/title";
import clsx from "clsx";
import Icon from "@/ui/icons/lucideIcon";

export const SideBarHeader = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4",
        "border-b",
        "border-sidebar-header-dark/20",
        "bg-sidebar-header-light",
        "dark:border-sidebar-header-light/20",
        "dark:bg-sidebar-header-dark"
      )}
    >
      <Title variant="h4" className="font-semibold m-0">
        Menú
      </Title>
      <Icon icon={X} onClick={closeMobileMenu} ariaLabel="Cerrar menú" />
    </div>
  );
};
