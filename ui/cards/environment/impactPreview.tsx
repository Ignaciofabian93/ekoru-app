import { motion } from "motion/react";
import { Text } from "@/ui/text/text";
import { ImageIcon, Leaf, Recycle } from "lucide-react";
import clsx from "clsx";

type Props = {
  isPersonProfile: boolean;
  environmentalImpact: {
    totalCo2: number;
    totalWater: number;
    materials: { name: string; percentage: number; isPrimary: boolean }[];
  };
};

export default function ImpactPreviewCard({ isPersonProfile, environmentalImpact }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-500 rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <Text variant="p" className="font-bold text-gray-800 dark:text-gray-100">
            Impacto Ambiental Estimado
          </Text>
          <Text variant="span" className="text-sm text-gray-600 dark:text-gray-300">
            Al reutilizar este producto, contribuyes a:
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <Recycle className="w-8 h-8 text-blue-500" />
          <div>
            <Text variant="p" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              ~{environmentalImpact.totalCo2} kg
            </Text>
            <Text variant="span" className="text-xs text-gray-600 dark:text-gray-400">
              CO₂ ahorrado (promedio)
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <ImageIcon className="w-8 h-8 text-cyan-500" />
          <div>
            <Text variant="p" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              ~{environmentalImpact.totalWater} L
            </Text>
            <Text variant="span" className="text-xs text-gray-600 dark:text-gray-400">
              Agua ahorrada (promedio)
            </Text>
          </div>
        </div>
      </div>

      {/* Material Composition */}
      {isPersonProfile && environmentalImpact.materials?.length > 0 && (
        <div className="mt-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
          <Text variant="p" className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Composición de Materiales (promedio)
          </Text>
          <div className="space-y-2">
            {environmentalImpact.materials.map((material, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={clsx("w-2 h-2 rounded-full", material.isPrimary ? "bg-green-500" : "bg-gray-400")} />
                  <Text variant="span" className="text-sm text-gray-700 dark:text-gray-300">
                    {material.name}{" "}
                    {material.isPrimary && (
                      <Text variant="small" className="ml-2">
                        (Material principal)
                      </Text>
                    )}
                  </Text>
                </div>
                <Text variant="span" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {material.percentage}%
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}

      <Text variant="span" className="text-xs text-gray-500 dark:text-gray-400 mt-3 block text-center italic">
        * Estimaciones promedio basadas en la categoría del producto
      </Text>
    </motion.div>
  );
}
