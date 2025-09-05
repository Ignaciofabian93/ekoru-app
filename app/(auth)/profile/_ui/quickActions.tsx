import { Heart, Leaf, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const stats = {
  orders: 12,
  favorites: 45,
  impact: {
    co2Saved: 127.5,
    waterSaved: 2340,
    wasteDiverted: 18.2,
  },
  listings: 3,
};

const quickActions = [
  {
    title: "Mis Pedidos",
    description: `${stats.orders} pedidos realizados`,
    href: "/profile/orders",
    icon: ShoppingBag,
    color: "bg-blue-500",
    stats: stats.orders,
  },
  {
    title: "Favoritos",
    description: `${stats.favorites} productos guardados`,
    href: "/profile/favorites",
    icon: Heart,
    color: "bg-red-500",
    stats: stats.favorites,
  },
  {
    title: "Dashboard de Impacto",
    description: `${stats.impact.co2Saved} kg CO₂ ahorrado`,
    href: "/profile/impact-dashboard",
    icon: Leaf,
    color: "bg-green-500",
    stats: `${stats.impact.co2Saved}kg`,
  },
  {
    title: "Mis Productos",
    description: `${stats.listings} productos publicados`,
    href: "/profile/my-products",
    icon: Package,
    color: "bg-purple-500",
    stats: stats.listings,
  },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Acceso Rápido
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-white rounded-xl shadow-sm border border-neutral/20 p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${action.color} rounded-lg p-3`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {action.stats}
                </span>
              </div>
              <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-text-muted text-sm">{action.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
