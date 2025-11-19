"use client";

import { Seller } from "@/types/user";
import { MapPin, Phone, Mail, Globe, Star, MessageCircle } from "lucide-react";
import Image from "next/image";

type Props = {
  seller: Seller;
};

export default function SellerInfo({ seller }: Props) {
  const getSellerName = () => {
    if (seller.profile?.__typename === "PersonProfile") {
      return seller.profile.displayName || `${seller.profile.firstName} ${seller.profile.lastName || ""}`.trim();
    } else if (seller.profile?.__typename === "BusinessProfile") {
      return seller.profile.businessName;
    }
    return "Vendedor";
  };

  const getSellerImage = () => {
    if (seller.profile?.__typename === "PersonProfile") {
      return seller.profile.profileImage;
    } else if (seller.profile?.__typename === "BusinessProfile") {
      return seller.profile.logo;
    }
    return null;
  };

  const getLocation = () => {
    const parts = [seller.city?.city, seller.region?.region, seller.country?.country].filter(Boolean);
    return parts.join(", ") || seller.address;
  };

  return (
    <div className="bg-neutral-50 dark:bg-stone-800/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-text-primary dark:text-stone-100 mb-6">Información del Vendedor</h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Seller Avatar & Basic Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-neutral-200 dark:bg-stone-700 flex-shrink-0">
            {getSellerImage() ? (
              <Image src={getSellerImage()!} alt={getSellerName()} fill className="object-cover" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-neutral-400 dark:text-stone-500">
                {getSellerName().charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-bold text-text-primary dark:text-stone-100">{getSellerName()}</h4>
              {seller.isVerified && (
                <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded-full">
                  ✓ Verificado
                </span>
              )}
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                {seller.sellerType}
              </span>
            </div>

            {seller.profile?.__typename === "PersonProfile" && seller.profile.bio && (
              <p className="text-text-muted dark:text-stone-400 text-sm mb-3">{seller.profile.bio}</p>
            )}

            {seller.profile?.__typename === "BusinessProfile" && seller.profile.description && (
              <p className="text-text-muted dark:text-stone-400 text-sm mb-3">{seller.profile.description}</p>
            )}

            <div className="flex items-center gap-2 text-warning mb-2">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4" />
              <span className="text-text-secondary dark:text-stone-300 text-sm ml-1">4.0 (12 reseñas)</span>
            </div>

            {seller.sellerLevel && (
              <div className="flex items-center gap-2 text-sm text-text-muted dark:text-stone-400">
                <span className="font-semibold">Nivel:</span>
                <span>{seller.points} puntos</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex-1 space-y-3">
          <h5 className="font-semibold text-text-primary dark:text-stone-100 mb-3">Información de Contacto</h5>

          {getLocation() && (
            <div className="flex items-center gap-2 text-text-secondary dark:text-stone-300 text-sm">
              <MapPin className="w-4 h-4 text-text-muted dark:text-stone-400" />
              <span>{getLocation()}</span>
            </div>
          )}

          {seller.phone && (
            <div className="flex items-center gap-2 text-text-secondary dark:text-stone-300 text-sm">
              <Phone className="w-4 h-4 text-text-muted dark:text-stone-400" />
              <a href={`tel:${seller.phone}`} className="hover:text-primary transition-colors">
                {seller.phone}
              </a>
            </div>
          )}

          {seller.email && (
            <div className="flex items-center gap-2 text-text-secondary dark:text-stone-300 text-sm">
              <Mail className="w-4 h-4 text-text-muted dark:text-stone-400" />
              <a href={`mailto:${seller.email}`} className="hover:text-primary transition-colors">
                {seller.email}
              </a>
            </div>
          )}

          {seller.website && (
            <div className="flex items-center gap-2 text-text-secondary dark:text-stone-300 text-sm">
              <Globe className="w-4 h-4 text-text-muted dark:text-stone-400" />
              <a
                href={seller.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {seller.website}
              </a>
            </div>
          )}

          {seller.preferredContactMethod && (
            <p className="text-xs text-text-muted dark:text-stone-400 mt-4">
              Método de contacto preferido: <span className="font-semibold">{seller.preferredContactMethod}</span>
            </p>
          )}

          <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-4">
            <MessageCircle className="w-4 h-4" />
            Contactar al vendedor
          </button>
        </div>
      </div>
    </div>
  );
}
