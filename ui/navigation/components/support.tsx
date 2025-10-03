import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import Link from "next/link";

export default function Support({ closeMobileMenu }: { closeMobileMenu: () => void }) {
  return (
    <section className="p-4 border-t border-neutral-300 dark:border-neutral-700">
      <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
        Soporte
      </Title>
      <div className="space-y-1">
        <Link
          href="/help"
          onClick={closeMobileMenu}
          className="flex items-center px-3 py-2 hover:bg-card-light-100 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
        >
          <Text variant="span" className="">
            Centro de Ayuda
          </Text>
        </Link>
        <Link
          href="/contact"
          onClick={closeMobileMenu}
          className="flex items-center px-3 py-2 hover:bg-card-light-100 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
        >
          <Text variant="span" className="">
            Contacto
          </Text>
        </Link>
      </div>
    </section>
  );
}
