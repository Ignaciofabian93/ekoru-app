import { Text } from "@/ui/text/text";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";

export const AccordionWrapper = ({ children }: { children: React.ReactNode }) => (
  <article className="border-b border-neutral/10 last:border-b-0">{children}</article>
);

export const AccordionListWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: "auto" }}
    exit={{ height: 0 }}
    transition={{ duration: 0.2 }}
    className="overflow-hidden bg-card-light-100/40 dark:bg-card-dark-800 rounded-lg mt-1"
  >
    {children}
  </motion.div>
);

export const AccordionListItem = ({
  href,
  name,
  closeMobileMenu,
}: {
  href: string;
  name: string;
  closeMobileMenu: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={closeMobileMenu}
      className={clsx(
        "block p-3 pl-6",
        "border-b border-neutral-300 dark:border-neutral-600",
        "hover:bg-container-light-200 dark:hover:bg-container-dark-600",
        "transition-colors"
      )}
    >
      <Text variant="span" className="font-medium mb-1">
        {name}
      </Text>
    </Link>
  );
};
