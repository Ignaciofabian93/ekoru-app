import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import { Heart, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function QuickActions({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  const ItemLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex group relative items-center justify-start px-3 py-3",
        "hover:bg-sidebar-quickActions-lightHover",
        "dark:hover:bg-sidebar-quickActions-darkHover",
        "transition-colors",
        "rounded-lg border",
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
        Acciones Rápidas
      </Title>
      <div className="space-y-2">
        <ItemLink href="/cart" onClick={closeMobileMenu}>
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-3 text-primary" />
            <Text variant="span" className="font-medium group-hover:text-primary">
              Carrito de Compras
            </Text>
          </div>
          <span className="absolute right-2 bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            3
          </span>
        </ItemLink>
        <ItemLink href="/profile/favorites" onClick={closeMobileMenu}>
          <Heart className="h-5 w-5 mr-3 text-primary" />
          <Text variant="span" className="font-medium group-hover:text-primary">
            Lista de favoritos
          </Text>
        </ItemLink>
      </div>
    </section>
  );
}
