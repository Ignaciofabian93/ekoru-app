"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import {
  ads,
  bestRankedStores,
  bestStoreProducts,
  exchangeableProducts,
  featuredCategories,
  secondHandProducts,
} from "./mockups/data";
import NewsLetter from "@/ui/newsletter/newsletter";
import HorizontalScrollSection from "@/ui/layout/horizontalScrollSection";
import AdBanner from "@/ui/banners/adBanner";
import { getBadgeColor } from "@/utils/badgeColor";
import SmallStoreCard from "@/ui/cards/store/smallStoreCard";
import HeroCarousel from "@/ui/carousel/hero";
import ProductCard from "@/ui/cards/product/productCard";

export default function FeedPage() {
  // Component for second hand product card
  const SecondHandCard = ({
    product,
  }: {
    product: (typeof secondHandProducts)[0];
  }) => (
    <article className="flex-shrink-0 w-48 sm:w-56 bg-white rounded-xl shadow-sm border border-neutral/20 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <figure className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute top-2 left-2">
          <span
            className={`${getBadgeColor(
              product.badge
            )} text-xs font-medium px-2 py-1 rounded`}
          >
            {product.badge}
          </span>
        </span>
        <span className="absolute top-2 right-2 bg-success text-white text-xs font-medium px-2 py-1 rounded">
          -{product.savings}%
        </span>
        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-text-primary text-xs font-medium px-2 py-1 rounded">
          {product.condition}
        </span>
      </figure>
      <div className="p-3">
        <header className="flex items-center justify-between mb-2">
          <span className="text-text-muted text-xs truncate">
            {product.brand}
          </span>
          <div className="flex items-center flex-shrink-0 ml-2">
            <Star className="w-3 h-3 text-warning fill-warning" />
            <span className="text-text-secondary text-xs ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </header>
        <h3 className="font-medium text-text-primary text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-text-muted text-xs mb-2">Por {product.seller}</p>
        <footer className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-lg font-bold text-text-primary">
              €{product.price}
            </span>
            <span className="text-text-muted text-xs line-through ml-1">
              €{product.originalPrice}
            </span>
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </article>
  );

  // Component for exchange product card
  const ExchangeCard = ({
    product,
  }: {
    product: (typeof exchangeableProducts)[0];
  }) => (
    <article className="flex-shrink-0 w-48 sm:w-56 bg-white rounded-xl shadow-sm border border-neutral/20 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <figure className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute top-2 left-2">
          <span
            className={`${getBadgeColor(
              product.badge
            )} text-xs font-medium px-2 py-1 rounded`}
          >
            {product.badge}
          </span>
        </span>
        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-text-primary text-xs font-medium px-2 py-1 rounded">
          {product.condition}
        </span>
      </figure>
      <div className="p-3">
        <header className="flex items-center justify-between mb-2">
          <span className="text-text-muted text-xs truncate">
            {product.category}
          </span>
          <span className="text-text-secondary text-xs flex-shrink-0 ml-2">
            {product.interested} interesados
          </span>
        </header>
        <h3 className="font-medium text-text-primary text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-text-muted text-xs mb-2">Por {product.owner}</p>
        <div className="bg-primary/5 rounded-lg p-2 mb-3">
          <p className="text-primary text-xs font-medium">
            Busca: {product.exchangeFor}
          </p>
        </div>
        <footer>
          <button
            className="w-full bg-secondary hover:bg-secondary/80 text-white py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            aria-label="Proponer intercambio"
          >
            Proponer Intercambio
          </button>
        </footer>
      </div>
    </article>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-light/10">
        {/* Banner Carousel */}
        <HeroCarousel />
        {/* Featured Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Explora por Categorías
              </h2>
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
        >
          {bestStoreProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product }}
              favorites={[]}
              toggleFavorite={() => {}}
            />
          ))}
        </HorizontalScrollSection>

        {/* Second Ad */}
        <AdBanner {...ads[1]} />

        {/* Second Hand Products Section */}
        <HorizontalScrollSection
          title="Productos de Segunda Mano"
          description="Dale una segunda vida a productos de calidad"
          backgroundColor="bg-neutral-light/20"
        >
          {secondHandProducts.map((product) => (
            <SecondHandCard key={product.id} product={product} />
          ))}
        </HorizontalScrollSection>

        {/* Third Ad */}
        <AdBanner {...ads[2]} />

        {/* Exchangeable Products Section */}
        <HorizontalScrollSection
          title="Productos para Intercambio"
          description="Intercambia productos y contribuye a la economía circular"
        >
          {exchangeableProducts.map((product) => (
            <ExchangeCard key={product.id} product={product} />
          ))}
        </HorizontalScrollSection>

        {/* Newsletter/CTA Section */}
        <NewsLetter />
      </div>
    </MainLayout>
  );
}
