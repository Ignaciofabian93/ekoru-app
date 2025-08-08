"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
} from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import {
  ads,
  banners,
  bestRankedStores,
  bestStoreProducts,
  exchangeableProducts,
  featuredCategories,
  secondHandProducts,
} from "./mockups/data";
import NewsLetter from "@/ui/newsletter/newsletter";

export default function FeedPage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([2, 5]);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      Bestseller: "bg-warning text-white",
      Orgánico: "bg-success text-white",
      Descuento: "bg-error text-white",
      "Zero Waste": "bg-info text-white",
      Jardín: "bg-primary text-white",
      Bambú: "bg-secondary text-white",
      "Top Rated": "bg-warning text-white",
      Certificado: "bg-success text-white",
      "Eco Expert": "bg-primary text-white",
      Popular: "bg-info text-white",
      "Segunda Mano": "bg-neutral text-white",
      Usado: "bg-neutral-dark text-white",
      Reacondicionado: "bg-success text-white",
      Intercambio: "bg-secondary text-white",
      Trueque: "bg-primary-light text-white",
    };
    return colors[badge as keyof typeof colors] || "bg-neutral text-white";
  };

  // Component for store card
  const StoreCard = ({ store }: { store: (typeof bestRankedStores)[0] }) => (
    <article className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl shadow-sm border border-neutral/20 p-4 hover:shadow-lg transition-all duration-200">
      <header className="flex items-center mb-3">
        <figure className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <Image
            src={store.image}
            alt={store.name}
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </figure>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h3 className="font-semibold text-text-primary text-sm truncate">
              {store.name}
            </h3>
            {store.verified && (
              <span
                className="ml-2 w-4 h-4 bg-success rounded-full flex items-center justify-center flex-shrink-0"
                aria-label="Tienda verificada"
              >
                <svg
                  className="w-2 h-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
          <address className="text-text-muted text-xs not-italic">
            {store.location}
          </address>
        </div>
      </header>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="text-text-secondary text-sm ml-1">
            {store.rating} ({store.reviews})
          </span>
        </div>
        <span
          className={`${getBadgeColor(
            store.badge
          )} text-xs font-medium px-2 py-1 rounded`}
        >
          {store.badge}
        </span>
      </div>
      <p className="text-text-muted text-sm mb-3">{store.products} productos</p>
      <Link
        href={`/stores/${store.id}`}
        className="block w-full text-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
      >
        Ver Tienda
      </Link>
    </article>
  );

  // Component for product card (compact)
  const ProductCard = ({
    product,
  }: {
    product: (typeof bestStoreProducts)[0];
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
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={
            favorites.includes(product.id)
              ? "Quitar de favoritos"
              : "Añadir a favoritos"
          }
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorites.includes(product.id)
                ? "text-red-500 fill-red-500"
                : "text-neutral"
            }`}
          />
        </button>
        {product.discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-error text-white text-xs font-medium px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
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
        <footer className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-lg font-bold text-text-primary">
              €{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-text-muted text-xs line-through ml-1">
                €{product.originalPrice}
              </span>
            )}
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

  // Component for ad banner
  const AdBanner = ({ ad }: { ad: (typeof ads)[0] }) => (
    <section className="py-8" role="banner" aria-label="Publicidad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article
          className={`${ad.bgColor} rounded-2xl p-6 sm:p-8 border border-neutral/20`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center flex-1 min-w-0">
              <figure className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0">
                <Image
                  src={ad.image}
                  alt={ad.title}
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
              </figure>
              <div className="min-w-0 flex-1">
                <header>
                  <h3
                    className={`${ad.textColor} text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-1`}
                  >
                    {ad.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base line-clamp-1 sm:line-clamp-none">
                    {ad.subtitle}
                  </p>
                </header>
              </div>
            </div>
            <footer className="flex-shrink-0 w-full sm:w-auto">
              <Link
                href={ad.href}
                className={`${ad.textColor} bg-white/80 backdrop-blur-sm hover:bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm block text-center sm:inline-block text-sm sm:text-base`}
              >
                {ad.cta}
              </Link>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-light/10">
        {/* Banner Carousel */}
        <section className="relative overflow-hidden">
          <div className="relative h-96 md:h-[500px]">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentBanner
                    ? "translate-x-0"
                    : index < currentBanner
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
              >
                <div className={`${banner.bgColor} h-full flex items-center`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                          {banner.title}
                        </h1>
                        <h2 className="text-xl md:text-2xl mb-4 text-white/90">
                          {banner.subtitle}
                        </h2>
                        <p className="text-lg mb-8 text-white/80 max-w-lg">
                          {banner.description}
                        </p>
                        <Link
                          href={banner.href}
                          className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-neutral-light transition-colors duration-200 shadow-lg"
                        >
                          {banner.cta}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </div>
                      <div className="flex justify-center lg:justify-end">
                        <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Image
                            src={banner.image}
                            alt={banner.title}
                            width={200}
                            height={200}
                            className="w-32 h-32 md:w-40 md:h-40 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentBanner
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>

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
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                  Tiendas Mejor Valoradas
                </h2>
                <p className="text-text-muted">
                  Las tiendas con mejor reputación de nuestra comunidad
                </p>
              </div>
              <Link
                href="/stores"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Ver todas
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {bestRankedStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </section>

        {/* First Ad */}
        <AdBanner ad={ads[0]} />

        {/* Best Store Products Section */}
        <section className="py-12 bg-neutral-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                  Productos Más Populares
                </h2>
                <p className="text-text-muted">
                  Los favoritos de nuestras tiendas destacadas
                </p>
              </div>
              <Link
                href="/products/bestsellers"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {bestStoreProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Second Ad */}
        <AdBanner ad={ads[1]} />

        {/* Second Hand Products Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                  Productos de Segunda Mano
                </h2>
                <p className="text-text-muted">
                  Dale una segunda vida a productos de calidad
                </p>
              </div>
              <Link
                href="/products/second-hand"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {secondHandProducts.map((product) => (
                <SecondHandCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Third Ad */}
        <AdBanner ad={ads[2]} />

        {/* Exchangeable Products Section */}
        <section className="py-12 bg-neutral-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                  Productos para Intercambio
                </h2>
                <p className="text-text-muted">
                  Intercambia productos y contribuye a la economía circular
                </p>
              </div>
              <Link
                href="/products/exchange"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {exchangeableProducts.map((product) => (
                <ExchangeCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <NewsLetter />
      </div>
    </MainLayout>
  );
}
