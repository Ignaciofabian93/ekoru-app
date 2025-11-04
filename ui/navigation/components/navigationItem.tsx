import { Text } from "@/ui/text/text";
import clsx from "clsx";
import Link from "next/link";

export const NavigationListItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="ml-4">{children}</div>;
};

export const NavigationItem = ({
  closeMobileMenu,
  title,
  href,
}: {
  closeMobileMenu: () => void;
  title: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      onClick={closeMobileMenu}
      className={clsx(
        "group",
        "block p-3 ml-4 border-b",
        "border-sidebar-navigationItem-darkHover/20",
        "hover:bg-sidebar-navigationItem-lightHover/50",
        "dark:border-sidebar-navigationItem-lightHover/20",
        "dark:hover:bg-sidebar-navigationItem-darkHover/50",
        "transition-all duration-200"
      )}
    >
      <Text variant="span" className="font-medium">
        {title}
      </Text>
    </Link>
  );
};
