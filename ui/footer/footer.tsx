import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "../icons/instagram";
import LinkedinIcon from "../icons/linkedin";
import clsx from "clsx";

const IconLink = ({ children, url, label }: { children: React.ReactNode; url: string; label: string }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded"
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer
      className={clsx(
        "bg-gradient-to-r from-footer-light-950 via-footer-light-600 to-footer-light-950",
        "dark:from-footer-dark-950 dark:via-footer-dark-700 dark:to-footer-dark-950",
        "text-white border-t border-white",
        "dark:border-footer-dark-800"
      )}
      role="contentinfo"
      aria-label="Información del sitio web"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Section */}
          <div className="flex-shrink-0">
            <Link
              href="/feed"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded"
              aria-label="Ir a la página de inicio de EKORU"
            >
              <Image
                src="/brand/logo.webp"
                alt="EKORU - Logo de la empresa"
                width={100}
                height={50}
                className="h-full max-h-[50px] w-auto drop-shadow-xs drop-shadow-slate-900/20"
              />
            </Link>
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center space-y-4">
            <blockquote className="text-sm text-main italic" role="img" aria-label="Lema de la empresa">
              <q>
                Lo cotidiano{" "}
                <span className="text-white font-bold uppercase drop-shadow-xs drop-shadow-slate-900/50">
                  cambia el mundo
                </span>
              </q>
            </blockquote>

            {/* Main Navigation */}
            <nav aria-label="Navegación principal del pie de página">
              <h2 className="sr-only">Enlaces principales</h2>
              <ul className="flex flex-wrap gap-4 text-white text-sm font-medium" role="list">
                <li>
                  <Link
                    href="/community"
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                  >
                    Comunidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/departments"
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                  >
                    Mercado
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stores"
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                  >
                    Tiendas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                  >
                    Ayuda
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3" role="group" aria-label="Enlaces de redes sociales">
            <h2 className="sr-only">Síguenos en redes sociales</h2>
            <IconLink
              url="https://www.instagram.com/ekoru_chile?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              label="Seguir a EKORU en Instagram (se abre en una nueva ventana)"
            >
              <InstagramIcon width={37} height={37} className="hover:scale-125 transition-transform duration-300" />
            </IconLink>
            <IconLink
              url="https://www.linkedin.com/company/ekoru-chile/"
              label="Seguir a EKORU en LinkedIn (se abre en una nueva ventana)"
            >
              <LinkedinIcon width={36} height={36} className="hover:scale-125 transition-transform duration-300" />
            </IconLink>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white border-t border-white/10 pt-6">
          {/* Legal Links */}
          <nav aria-label="Enlaces legales">
            <h2 className="sr-only">Información legal</h2>
            <ul className="flex gap-3 flex-wrap" role="list">
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms-of-service"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/community-guidelines"
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-footer-dark-950 rounded px-1 py-0.5"
                >
                  Normas de la comunidad
                </Link>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <span className="block" role="contentinfo">
            © {new Date().getFullYear()} Ekoru. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
