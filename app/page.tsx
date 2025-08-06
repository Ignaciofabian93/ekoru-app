"use client";
import MainButton from "@/ui/buttons/mainButton";
import {
  CarouselCard,
  CompactCard,
  ContentCard,
  SimpleCard,
} from "@/ui/cards/product/examples";
import ProductCard from "@/ui/cards/product/productCard";
import StoreCard from "@/ui/cards/store/storeCard";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>APP</p>
        <div className="flex w-full">
          <div>
            <MainButton text="Continuar" variant="primary" />
            <MainButton text="Continuar" variant="destructive" />
            <MainButton text="Continuar" variant="outline" />
            <MainButton text="Continuar" variant="ghost" />
            <MainButton text="Continuar" variant="warning" />
          </div>
          <div>
            <SimpleCard />
            <CarouselCard />
            <ContentCard />
            <CompactCard />
            <ProductCard
              title="Guitarra"
              description="Usada"
              price={100000}
              images={[]}
            />
            <StoreCard
              name="Tienda de Ejemplo"
              description="La mejor tienda de ejemplo"
              wallpaperImage="/path/to/wallpaper.jpg"
              brandIcon="/path/to/brand-icon.jpg"
              location="Ciudad Ejemplo"
              rating={4.5}
              reviewCount={100}
              phone="+123456789"
              socialMedia={[
                { platform: "instagram", url: "https://instagram.com" },
                { platform: "facebook", url: "https://facebook.com" },
                { platform: "twitter", url: "https://twitter.com" },
                { platform: "website", url: "https://example.com" },
              ]}
              isOpen={true}
              openingHours="Lun-Vie: 9am - 5pm"
              onVisitStore={() => console.log("Visitar tienda")}
              onToggleFavorite={() => console.log("Toggle favorite")}
              onCall={() => console.log("Llamar")}
              isFavorite={false}
              verified={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
