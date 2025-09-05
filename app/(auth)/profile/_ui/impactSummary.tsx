import { Leaf, TrendingUp } from "lucide-react";
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

export default function ImpactSummary() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-xl p-6 border border-primary/20">
      <div className="flex items-center mb-6">
        <div className="bg-primary rounded-lg p-3 mr-4">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">
            Tu Impacto Ecológico
          </h3>
          <p className="text-text-muted">
            Contribución al medio ambiente este mes
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {stats.impact.co2Saved} kg
          </div>
          <div className="text-sm text-text-muted">CO₂ Ahorrado</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-info mb-1">
            {stats.impact.waterSaved} L
          </div>
          <div className="text-sm text-text-muted">Agua Ahorrada</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {stats.impact.wasteDiverted} kg
          </div>
          <div className="text-sm text-text-muted">Residuos Evitados</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-primary/20">
        <Link
          href="/profile/impact-dashboard"
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Ver impacto detallado
          <TrendingUp className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
