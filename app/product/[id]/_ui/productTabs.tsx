"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { Leaf, Droplets, FileText } from "lucide-react";

type Props = {
  product: Product;
};

type Tab = "description" | "environmental" | "specifications";

export default function ProductTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const tabs = [
    { id: "description" as Tab, label: "Descripción", icon: FileText },
    ...(product.environmentalImpact ? [{ id: "environmental" as Tab, label: "Impacto Ambiental", icon: Leaf }] : []),
    // ...(product.productCategory ? [{ id: "specifications" as Tab, label: "Especificaciones", icon: FileText }] : []),
  ];

  return (
    <div className="mb-12">
      {/* Tab Headers */}
      <div className="border-b border-neutral-200 dark:border-stone-700 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-semibold transition-all relative flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-primary dark:text-lime-400"
                    : "text-text-muted dark:text-stone-400 hover:text-text-secondary dark:hover:text-stone-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-lime-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-neutral-50 dark:bg-stone-800/30 rounded-xl p-6">
        {activeTab === "description" && (
          <div>
            <h3 className="text-xl font-bold text-text-primary dark:text-stone-100 mb-4">Descripción del Producto</h3>
            <p className="text-text-secondary dark:text-stone-300 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
            {product.conditionDescription && (
              <div className="mt-4 p-4 bg-white dark:bg-stone-800 rounded-lg">
                <h4 className="font-semibold text-text-primary dark:text-stone-100 mb-2">Detalles de la condición:</h4>
                <p className="text-text-secondary dark:text-stone-300">{product.conditionDescription}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "environmental" && product.environmentalImpact && (
          <div>
            <h3 className="text-xl font-bold text-text-primary dark:text-stone-100 mb-4 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-success" />
              Impacto Ambiental
            </h3>
            <p className="text-text-muted dark:text-stone-400 mb-6">
              Al comprar este producto de segunda mano, estás contribuyendo positivamente al medio ambiente.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-success/10 to-success/5 dark:from-success/20 dark:to-success/10 rounded-xl p-6 border border-success/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-success/20 rounded-lg">
                    <Leaf className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted dark:text-stone-400">CO₂ Ahorrado</p>
                    <p className="text-3xl font-bold text-success">
                      {formatNumber(product.environmentalImpact.totalCo2SavingsKG)} kg
                    </p>
                  </div>
                </div>
                <p className="text-xs text-text-muted dark:text-stone-400">
                  Equivalente a plantar {Math.round(product.environmentalImpact.totalCo2SavingsKG / 20)} árboles
                </p>
              </div>

              <div className="bg-gradient-to-br from-info/10 to-info/5 dark:from-info/20 dark:to-info/10 rounded-xl p-6 border border-info/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-info/20 rounded-lg">
                    <Droplets className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted dark:text-stone-400">Agua Ahorrada</p>
                    <p className="text-3xl font-bold text-info">
                      {formatNumber(product.environmentalImpact.totalWaterSavingsLT)} L
                    </p>
                  </div>
                </div>
                <p className="text-xs text-text-muted dark:text-stone-400">
                  Equivalente a {Math.round(product.environmentalImpact.totalWaterSavingsLT / 150)} duchas
                </p>
              </div>
            </div>

            {product.environmentalImpact.materialBreakdown.length > 0 && (
              <div className="bg-white dark:bg-stone-800 rounded-xl p-6">
                <h4 className="font-semibold text-text-primary dark:text-stone-100 mb-4">Composición de Materiales</h4>
                <div className="space-y-3">
                  {product.environmentalImpact.materialBreakdown.map((material, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary dark:text-stone-300 font-medium">
                          {material.materialType}
                        </span>
                        <span className="text-text-primary dark:text-stone-100 font-bold">{material.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-primary dark:bg-lime-400 h-2 rounded-full transition-all"
                          style={{ width: `${material.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-text-muted dark:text-stone-400 mt-1">
                        <span>CO₂: {formatNumber(material.co2SavingsKG)} kg</span>
                        <span>Agua: {formatNumber(material.waterSavingsLT)} L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "specifications" && product.productCategory && (
          <div>
            <h3 className="text-xl font-bold text-text-primary dark:text-stone-100 mb-4">Especificaciones Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-stone-800 rounded-lg p-4">
                <p className="text-text-muted dark:text-stone-400 text-sm mb-1">Categoría</p>
                <p className="text-text-primary dark:text-stone-100 font-semibold">
                  {product.productCategory.productCategoryName}
                </p>
              </div>
              {product.productCategory.size && (
                <div className="bg-white dark:bg-stone-800 rounded-lg p-4">
                  <p className="text-text-muted dark:text-stone-400 text-sm mb-1">Tamaño</p>
                  <p className="text-text-primary dark:text-stone-100 font-semibold">{product.productCategory.size}</p>
                </div>
              )}
              {product.productCategory.averageWeight && (
                <div className="bg-white dark:bg-stone-800 rounded-lg p-4">
                  <p className="text-text-muted dark:text-stone-400 text-sm mb-1">Peso Aproximado</p>
                  <p className="text-text-primary dark:text-stone-100 font-semibold">
                    {product.productCategory.averageWeight} {product.productCategory.weightUnit}
                  </p>
                </div>
              )}
              <div className="bg-white dark:bg-stone-800 rounded-lg p-4">
                <p className="text-text-muted dark:text-stone-400 text-sm mb-1">Marca</p>
                <p className="text-text-primary dark:text-stone-100 font-semibold">{product.brand}</p>
              </div>
              {product.color && (
                <div className="bg-white dark:bg-stone-800 rounded-lg p-4">
                  <p className="text-text-muted dark:text-stone-400 text-sm mb-1">Color</p>
                  <p className="text-text-primary dark:text-stone-100 font-semibold">{product.color}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
