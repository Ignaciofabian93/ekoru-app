import clsx from "clsx";
import { motion } from "motion/react";
import { Badge } from "@/types/enums";
import { Text } from "../text/text";
import {
  TrendingUp,
  Percent,
  Award,
  Star,
  Heart,
  Clock,
  Zap,
  Gift,
  Hammer,
  Leaf,
  HandHeart,
  Users,
  Package,
  Calendar,
  Truck,
  Wrench,
  Sparkles,
  PackageOpen,
  Tag,
  Repeat,
  DollarSign,
  XCircle,
  Home,
  MapPin,
} from "lucide-react";

type Props = {
  selectedBadges: Badge[];
  onBadgeToggle: (badge: Badge) => void;
  isSubmitting?: boolean;
  maxBadges?: number;
};

const badgeConfig: {
  value: Badge;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  { value: "POPULAR", label: "Popular", icon: TrendingUp, color: "text-purple-500" },
  { value: "DISCOUNTED", label: "Con Descuento", icon: Percent, color: "text-red-500" },
  { value: "WOMAN_OWNED", label: "Mujer Emprendedora", icon: Award, color: "text-pink-500" },
  { value: "BEST_SELLER", label: "Más Vendido", icon: Star, color: "text-yellow-500" },
  { value: "TOP_RATED", label: "Mejor Valorado", icon: Star, color: "text-amber-500" },
  { value: "COMMUNITY_FAVORITE", label: "Favorito Comunidad", icon: Heart, color: "text-rose-500" },
  { value: "LIMITED_TIME_OFFER", label: "Oferta Limitada", icon: Clock, color: "text-orange-500" },
  { value: "FLASH_SALE", label: "Oferta Relámpago", icon: Zap, color: "text-yellow-600" },
  { value: "BEST_VALUE", label: "Mejor Precio", icon: DollarSign, color: "text-green-500" },
  { value: "HANDMADE", label: "Hecho a Mano", icon: Hammer, color: "text-brown-500" },
  { value: "SUSTAINABLE", label: "Sostenible", icon: Leaf, color: "text-green-600" },
  { value: "SUPPORTS_CAUSE", label: "Apoya una Causa", icon: HandHeart, color: "text-blue-500" },
  { value: "FAMILY_BUSINESS", label: "Negocio Familiar", icon: Users, color: "text-indigo-500" },
  { value: "CHARITY_SUPPORT", label: "Apoya Caridad", icon: Gift, color: "text-teal-500" },
  { value: "LIMITED_STOCK", label: "Stock Limitado", icon: Package, color: "text-red-600" },
  { value: "SEASONAL", label: "De Temporada", icon: Calendar, color: "text-cyan-500" },
  { value: "FREE_SHIPPING", label: "Envío Gratis", icon: Truck, color: "text-blue-600" },
  { value: "FOR_REPAIR", label: "Para Reparar", icon: Wrench, color: "text-gray-500" },
  { value: "REFURBISHED", label: "Reacondicionado", icon: Sparkles, color: "text-violet-500" },
  { value: "EXCHANGEABLE", label: "Intercambiable", icon: Repeat, color: "text-emerald-500" },
  { value: "LAST_PRICE", label: "Último Precio", icon: Tag, color: "text-red-700" },
  { value: "FOR_GIFT", label: "Para Regalo", icon: Gift, color: "text-pink-600" },
  { value: "OPEN_TO_OFFERS", label: "Acepta Ofertas", icon: DollarSign, color: "text-lime-500" },
  { value: "OPEN_BOX", label: "Caja Abierta", icon: PackageOpen, color: "text-orange-600" },
  { value: "CRUELTY_FREE", label: "Libre de Crueldad", icon: XCircle, color: "text-green-700" },
  { value: "DELIVERED_TO_HOME", label: "Entrega a Domicilio", icon: Home, color: "text-blue-700" },
  { value: "IN_HOUSE_PICKUP", label: "Retiro en Tienda", icon: Home, color: "text-purple-600" },
  { value: "IN_MID_POINT_PICKUP", label: "Retiro Punto Medio", icon: MapPin, color: "text-cyan-600" },
];

export default function BadgeSelector({ selectedBadges, onBadgeToggle, isSubmitting = false, maxBadges = 5 }: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Etiquetas del Producto (Opcional, máx. {maxBadges})
      </label>
      <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mb-3 block">
        Selecciona etiquetas que describan características especiales de tu producto
      </Text>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        {badgeConfig.map((badge) => {
          const isSelected = selectedBadges.includes(badge.value);
          const isDisabled = !isSelected && selectedBadges.length >= maxBadges;
          const Icon = badge.icon;

          return (
            <button
              key={badge.value}
              type="button"
              onClick={() => !isDisabled && onBadgeToggle(badge.value)}
              disabled={isSubmitting || isDisabled}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left",
                "hover:shadow-md hover:scale-[1.02]",
                isSelected
                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-sm"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
                isDisabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
                !isDisabled && !isSelected && "hover:border-primary/50"
              )}
            >
              <Icon className={clsx("w-4 h-4 flex-shrink-0", isSelected ? "text-primary" : badge.color)} />
              <Text
                variant="span"
                className={clsx(
                  "text-xs font-medium",
                  isSelected ? "text-primary" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {badge.label}
              </Text>
            </button>
          );
        })}
      </div>

      {selectedBadges.length > 0 && (
        <div className="mt-3">
          <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400">
            {selectedBadges.length}/{maxBadges} etiquetas seleccionadas
          </Text>
        </div>
      )}
    </motion.div>
  );
}
