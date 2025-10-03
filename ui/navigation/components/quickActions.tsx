import { Title } from "@/ui/text/title";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function QuickActions({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  return (
    <section className="p-4 border-t border-neutral-300 dark:border-neutral-700">
      <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
        Acciones Rápidas
      </Title>
      <div className="space-y-2">
        <Link
          href="/cart"
          onClick={closeMobileMenu}
          className="flex items-center justify-between px-3 py-3 text-title-700 dark:text-title-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg border border-neutral-300 dark:border-neutral-600"
        >
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-3 text-primary" />
            <span>Carrito de Compras</span>
          </div>
          <span className="bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">3</span>
        </Link>
        <Link
          href="/profile/favorites"
          onClick={closeMobileMenu}
          className="flex items-center px-3 py-3 text-title-700 dark:text-title-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg border border-neutral-300 dark:border-neutral-600"
        >
          <Heart className="h-5 w-5 mr-3 text-primary" />
          <span>Lista de favoritos</span>
        </Link>
      </div>
    </section>
  );
}
