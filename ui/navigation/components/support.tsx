import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import clsx from "clsx";
import Link from "next/link";

export default function Support({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  const ItemLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex group relative items-center justify-start px-3 py-3",
        "hover:bg-sidebar-quickActions-lightHover",
        "dark:hover:bg-sidebar-quickActions-darkHover",
        "transition-colors",
        "border-neutral-300",
        "dark:border-neutral-600"
      )}
    >
      {children}
    </Link>
  );

  return (
    <section className="p-4 border-t">
      <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
        Soporte
      </Title>
      <div className="space-y-1">
        <ItemLink href="/help" onClick={closeMobileMenu}>
          <Text variant="span" className="font-medium group-hover:text-primary">
            Centro de Ayuda
          </Text>
        </ItemLink>
        <ItemLink href="/contact" onClick={closeMobileMenu}>
          <Text variant="span" className="font-medium group-hover:text-primary">
            Contacto
          </Text>
        </ItemLink>
      </div>
    </section>
  );
}
