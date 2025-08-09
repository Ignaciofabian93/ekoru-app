import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "../_components/index";
import MainButton from "../../buttons/mainButton";
import {
  MapPin,
  Star,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  Heart,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

type SocialMedia = {
  platform: "instagram" | "facebook" | "twitter" | "website";
  url: string;
};

type StoreCardProps = {
  name: string;
  description: string;
  wallpaperImage: string;
  brandIcon: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  socialMedia?: SocialMedia[];
  isOpen?: boolean;
  openingHours?: string;
  onVisitStore?: () => void;
  onToggleFavorite?: () => void;
  onCall?: () => void;
  isFavorite?: boolean;
  verified?: boolean;
};

export default function StoreCard({
  name,
  description,
  wallpaperImage,
  brandIcon,
  location,
  rating,
  reviewCount,
  phone,
  socialMedia = [],
  isOpen = true,
  openingHours,
  onVisitStore,
  onToggleFavorite,
  onCall,
  isFavorite = false,
  verified = false,
}: StoreCardProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "website":
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <Card className="max-w-sm overflow-hidden">
      {/* Wallpaper Image with Brand Icon Overlay */}
      <div className="relative">
        <CardImage
          src={wallpaperImage}
          alt={`${name} store`}
          className="aspect-video"
        />

        {/* Brand Icon */}
        <div className="absolute -bottom-6 left-4 z-10">
          <div className="relative w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <Image
              src={brandIcon}
              alt={`${name} logo`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors backdrop-blur-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              isOpen ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
            }`}
          >
            {isOpen ? "Abierto" : "Cerrado"}
          </span>
        </div>
      </div>

      {/* Store Info */}
      <CardHeader className="pt-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{name}</CardTitle>
              {verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>

            {/* Rating */}
            {rating && (
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                {reviewCount && (
                  <span className="text-sm text-gray-500">({reviewCount})</span>
                )}
              </div>
            )}
          </div>
        </div>

        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="leading-tight">{location}</span>
        </div>

        {/* Opening Hours */}
        {openingHours && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{openingHours}</span>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <button
              onClick={onCall}
              className="text-lime-600 hover:text-lime-700 transition-colors"
            >
              {phone}
            </button>
          </div>
        )}

        {/* Social Media */}
        {socialMedia.length > 0 && (
          <div className="flex items-center space-x-3 pt-2">
            <span className="text-xs text-gray-500 font-medium">Síguenos:</span>
            <div className="flex space-x-2">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={`Visit ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* CTA Section */}
      <CardFooter className="space-y-2">
        <MainButton
          text="Visitar Tienda"
          variant="primary"
          icon={ExternalLink}
          onClick={onVisitStore}
        />

        {phone && (
          <MainButton
            text="Llamar"
            variant="outline"
            icon={Phone}
            onClick={onCall}
          />
        )}
      </CardFooter>
    </Card>
  );
}
