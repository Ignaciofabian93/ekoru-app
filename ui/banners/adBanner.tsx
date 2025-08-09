import Image from "next/image";
import Link from "next/link";
import { Ad } from "./types";

export default function AdBanner({
  id,
  title,
  subtitle,
  image,
  cta,
  href,
  bgColor,
  textColor,
}: Ad) {
  return (
    <section key={id} className="py-8" role="banner" aria-label="Publicidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article
          className={`${bgColor} rounded-2xl p-6 sm:p-8 border border-neutral/20`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center flex-1 min-w-0">
              <figure className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0">
                <Image
                  src={image}
                  alt={title}
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
              </figure>
              <div className="min-w-0 flex-1">
                <header>
                  <h3
                    className={`${textColor} text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-1`}
                  >
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base line-clamp-1 sm:line-clamp-none">
                    {subtitle}
                  </p>
                </header>
              </div>
            </div>
            <footer className="flex-shrink-0 w-full sm:w-auto">
              <Link
                href={href}
                className={`${textColor} bg-white/80 backdrop-blur-sm hover:bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm block text-center sm:inline-block text-sm sm:text-base`}
              >
                {cta}
              </Link>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
