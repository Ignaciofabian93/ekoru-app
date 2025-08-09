import { getBadgeColor } from "@/utils/badgeColor";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  products: number;
  badge: string;
  verified?: boolean;
};

export default function SmallStoreCard({
  id,
  name,
  image,
  location,
  rating,
  reviews,
  products,
  badge,
  verified,
}: Props) {
  return (
    <article className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl shadow-sm border border-neutral/20 p-4 hover:shadow-lg transition-all duration-200">
      <header className="flex items-center mb-3">
        <figure className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <Image
            src={image}
            alt={name}
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </figure>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h3 className="font-semibold text-text-primary text-sm truncate">
              {name}
            </h3>
            {verified && (
              <span
                className="ml-2 w-4 h-4 bg-success rounded-full flex items-center justify-center flex-shrink-0"
                aria-label="Tienda verificada"
              >
                <svg
                  className="w-2 h-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <address className="text-text-muted text-xs not-italic">
            {location}
          </address>
        </div>
      </header>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="text-text-secondary text-sm ml-1">
            {rating} ({reviews})
          </span>
        </div>
        <span
          className={`${getBadgeColor(
            badge
          )} text-xs font-medium px-2 py-1 rounded`}
        >
          {badge}
        </span>
      </div>
      <p className="text-text-muted text-sm mb-3">{products} productos</p>
      <Link
        href={`/stores/${id}`}
        className="block w-full text-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
      >
        Ver Tienda
      </Link>
    </article>
  );
}
