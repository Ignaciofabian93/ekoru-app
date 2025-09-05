import { Award, Clock, Heart, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const recentActivity = [
  {
    id: 1,
    type: "purchase",
    title: "Compró Detergente Ecológico Orgánico 1L",
    date: "Hace 2 días",
    icon: ShoppingBag,
  },
  {
    id: 2,
    type: "favorite",
    title: "Añadió Jabón Natural de Lavanda a favoritos",
    date: "Hace 4 días",
    icon: Heart,
  },
  {
    id: 3,
    type: "review",
    title: "Escribió una reseña para Bolsas Reutilizables de Algodón",
    date: "Hace 1 semana",
    icon: Award,
  },
  {
    id: 4,
    type: "listing",
    title: "Publicó Macetas de Bambú (intercambio)",
    date: "Hace 2 semanas",
    icon: Package,
  },
];

export default function RecentActivity() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          Actividad Reciente
        </h2>
        <Link
          href="/profile/activity"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Ver todo
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-neutral/20">
        {recentActivity.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div
              key={activity.id}
              className={`p-4 flex items-center ${
                index !== recentActivity.length - 1
                  ? "border-b border-neutral/10"
                  : ""
              }`}
            >
              <div className="bg-neutral-light rounded-lg p-2 mr-4">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary">
                  {activity.title}
                </p>
                <div className="flex items-center text-text-muted text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {activity.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
