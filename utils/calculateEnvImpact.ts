import { ProductCategoryMaterial } from "@/types/product";

export type EnvironmentalImpactResult = {
  totalCo2: number;
  totalWater: number;
  materials: {
    name: string;
    percentage: number;
    isPrimary: boolean;
    co2Savings: number;
    waterSavings: number;
  }[];
};

export const calculateEnvironmentalImpact = ({
  materials,
}: {
  materials: ProductCategoryMaterial[];
}): EnvironmentalImpactResult => {
  if (!materials || materials.length === 0) {
    return { totalCo2: 0, totalWater: 0, materials: [] };
  }

  let totalCo2 = 0;
  let totalWater = 0;
  const materialsData = materials.map((mat) => {
    const co2Savings = mat.material.estimatedCo2SavingsKG * mat.quantity;
    const waterSavings = mat.material.estimatedWaterSavingsLT * mat.quantity;

    totalCo2 += co2Savings;
    totalWater += waterSavings;

    return {
      name: mat.material.materialType,
      percentage: parseFloat(mat.unit),
      isPrimary: mat.isPrimary,
      co2Savings,
      waterSavings,
    };
  });

  return {
    totalCo2: parseFloat(totalCo2.toFixed(2)),
    totalWater: parseFloat(totalWater.toFixed(2)),
    materials: materialsData.sort((a, b) => b.percentage - a.percentage),
  };
};
