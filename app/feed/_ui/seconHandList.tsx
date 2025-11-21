import useProducts from "@/hooks/useProducts";
import HorizontalScrollSection from "@/ui/layout/horizontalScrollSection";
import ProductCardFlip from "@/ui/cards/product/marketplaceProduct/marketplaceCard";

export default function SecondHandList() {
  const { productsData } = useProducts({ isExchangeable: false });

  return (
    <HorizontalScrollSection
      title="Productos de Segunda Mano"
      description="Dale una segunda vida a productos de calidad"
      backgroundColor="bg-neutral-light/20"
      href="/departments"
    >
      {productsData && productsData.length > 0 ? (
        productsData.map((product) => <ProductCardFlip key={product.id} product={product} />)
      ) : (
        <p className="text-text-muted dark:text-stone-400 text-center py-8">No hay productos disponibles</p>
      )}
    </HorizontalScrollSection>
  );
}
