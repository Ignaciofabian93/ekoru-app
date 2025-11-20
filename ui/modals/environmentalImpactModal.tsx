"use client";
import { EnvironmentalImpact } from "@/types/product";
import Modal from "./modal";
import { Droplets, Leaf, Info } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  environmentalImpact: EnvironmentalImpact;
};

export default function EnvironmentalImpactModal({ isOpen, onClose, environmentalImpact }: Props) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Impacto Ambiental Detallado" size="md">
      <div className="space-y-6">
        {/* Environmental Savings Summary */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="bg-success/10 dark:bg-success/20 rounded-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-text-muted dark:text-stone-400">Ahorro de CO₂</span>
            </div>
            <p className="text-2xl font-bold text-success">{formatNumber(environmentalImpact.totalCo2SavingsKG)} kg</p>
            <p className="text-xs text-text-muted dark:text-stone-400 mt-1">
              Equivalente a {formatNumber(environmentalImpact.totalCo2SavingsKG * 4.5)} km en auto
            </p>
          </div>

          <div className="bg-info/10 dark:bg-info/20 rounded-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-info" />
              <span className="text-sm font-medium text-text-muted dark:text-stone-400">Ahorro de Agua</span>
            </div>
            <p className="text-2xl font-bold text-info">{formatNumber(environmentalImpact.totalWaterSavingsLT)} L</p>
            <p className="text-xs text-text-muted dark:text-stone-400 mt-1">
              Equivalente a {formatNumber(environmentalImpact.totalWaterSavingsLT / 8)} duchas
            </p>
          </div>
        </div>

        {/* Material Breakdown */}
        {environmentalImpact.materialBreakdown.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-text-primary dark:text-stone-100 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Composición de Materiales
            </h3>

            <div className="space-y-3">
              {environmentalImpact.materialBreakdown.map((material, index) => (
                <div
                  key={index}
                  className="border border-neutral/20 dark:border-stone-700 rounded-lg p-4 hover:bg-neutral/5 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-text-primary dark:text-stone-100">{material.materialType}</h4>
                    <span className="text-lg font-bold text-primary">{material.percentage.toFixed(1)}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-text-muted dark:text-stone-400 mb-1">Peso</p>
                      <p className="font-semibold text-text-secondary dark:text-stone-300">
                        {formatNumber(material.weightKG)} kg
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted dark:text-stone-400 mb-1">CO₂ ahorrado</p>
                      <p className="font-semibold text-success">{formatNumber(material.co2SavingsKG)} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted dark:text-stone-400 mb-1">Agua ahorrada</p>
                      <p className="font-semibold text-info">{formatNumber(material.waterSavingsLT)} L</p>
                    </div>
                  </div>

                  {/* Progress bar for percentage */}
                  <div className="mt-3 h-2 bg-neutral/10 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${material.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 text-sm text-text-secondary dark:text-stone-300">
          <p className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            <span>
              Estos valores son estimaciones basadas en el ahorro generado al reutilizar productos en lugar de fabricar
              nuevos. Los cálculos consideran el impacto promedio de la producción de cada material.
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
}
