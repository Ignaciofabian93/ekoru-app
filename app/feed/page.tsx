"use client";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/ui/layout/mainLayout";
import {
  ads,
  bestRankedStores,
  bestStoreProducts,
  // exchangeableProducts,
  featuredCategories,
} from "./mockups/data";
import NewsLetter from "@/ui/newsletter/newsletter";
import HorizontalScrollSection from "@/ui/layout/horizontalScrollSection";
import AdBanner from "@/ui/banners/adBanner";
// import { getBadgeColor } from "@/utils/badgeColor";
import SmallStoreCard from "@/ui/cards/store/smallStoreCard";
import HeroCarousel from "@/ui/carousel/hero";
import ProductCard from "@/ui/cards/product/productCard";
import SecondHandList from "./_ui/seconHandList";
// import SecondHandCard from "@/ui/cards/product/secondhand";
// import ExchangeCard from "@/ui/cards/product/exchange";

export default function FeedPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-light/10">
        {/* Banner Carousel */}
        <HeroCarousel />
        {/* Featured Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Explora por Categorías</h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Encuentra productos ecológicos organizados por categorías
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group bg-white rounded-xl shadow-sm border border-neutral/20 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-text-muted text-sm">{category.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Ranked Stores Section */}
        <HorizontalScrollSection
          title="Tiendas Mejor Valoradas"
          description="Las tiendas con mejor reputación de nuestra comunidad"
          href="/stores/storeCategories"
        >
          {bestRankedStores.map((store) => (
            <SmallStoreCard key={store.id} {...store} />
          ))}
        </HorizontalScrollSection>

        {/* First Ad */}
        <AdBanner {...ads[0]} />

        {/* Best Store Products Section */}
        <HorizontalScrollSection
          title="Productos más populares"
          description="Los favoritos de nuestras tiendas destacadas"
          href="/stores/storeCategories"
        >
          {bestStoreProducts.map((product) => (
            <ProductCard key={product.id} product={{ ...product }} favorites={[]} toggleFavorite={() => {}} />
          ))}
        </HorizontalScrollSection>

        {/* Second Ad */}
        <AdBanner {...ads[1]} />

        {/* Second Hand Products Section */}
        <SecondHandList />

        {/* Third Ad */}
        <AdBanner {...ads[2]} />

        {/* Exchangeable Products Section */}
        <HorizontalScrollSection
          title="Productos para Intercambio"
          description="Intercambia productos y contribuye a la economía circular"
          href="/departments"
        >
          <p>Exchange</p>
          {/* {exchangeableProducts.map((product) => (
            <ExchangeCard key={product.id} product={product} />
          ))} */}
        </HorizontalScrollSection>

        {/* Newsletter/CTA Section */}
        <NewsLetter />
      </div>
    </MainLayout>
  );
}
