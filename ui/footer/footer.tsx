import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "../icons/instagram";
import LinkedinIcon from "../icons/linkedin";

const IconLink = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Social Link"
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-white border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0">
            <Link href="/feed" className="flex items-center">
              <Image
                src="/brand/logo.webp"
                alt="EKORU"
                width={100}
                height={50}
                className="h-full max-h-[50px] w-auto drop-shadow-xs drop-shadow-slate-900/20"
              />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <q className="text-sm text-main italic">
              Lo cotidiano{" "}
              <span className="text-white font-bold uppercase drop-shadow-xs drop-shadow-slate-900/50">
                cambia el mundo
              </span>
            </q>
            <nav className="flex flex-wrap gap-4 text-white text-sm font-medium">
              <Link
                href="/community"
                className="hover:text-primary transition-colors"
              >
                Comunidad
              </Link>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/departments"
                className="hover:text-primary transition-colors"
              >
                Mercado
              </Link>
              <Link
                href="/stores"
                className="hover:text-primary transition-colors"
              >
                Tiendas
              </Link>
              <Link
                href="/help"
                className="hover:text-primary transition-colors"
              >
                Ayuda
              </Link>
            </nav>
          </div>
          <div className="flex gap-3">
            <IconLink url="https://www.instagram.com/ekoru_chile?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <InstagramIcon
                width={37}
                height={37}
                className="hover:scale-125 transition-transform duration-300"
              />
            </IconLink>
            <IconLink url="https://www.linkedin.com/company/ekoru-chile/">
              <LinkedinIcon
                width={36}
                height={36}
                className="hover:scale-125 transition-transform duration-300"
              />
            </IconLink>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/legal/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/legal/community-guidelines"
              className="hover:text-primary transition-colors"
            >
              Normas de la comunidad
            </Link>
          </div>
          <span className="block">
            © {new Date().getFullYear()} Ekoru. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
