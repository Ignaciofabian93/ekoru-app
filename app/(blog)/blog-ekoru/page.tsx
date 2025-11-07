"use client";
import MainLayout from "@/ui/layout/mainLayout";
import useBlogCategories from "@/app/(blog)/_hooks/useBlogCategories";
import { getIconComponent } from "@/app/(blog)/_utils/blogIcon";
import Link from "next/link";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import { BookOpen, ChevronRight, Notebook, TrendingUp } from "lucide-react";

export default function EkoruBlogPage() {
  const { categories, loading, error } = useBlogCategories();

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-lime-50">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Header Skeleton */}
            <div className="text-center mb-16">
              <div className="w-32 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
              <div className="w-96 h-6 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
              <div className="w-64 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
            </div>

            {/* Categories Grid Skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="w-32 h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-red-500" />
              </div>
              <Title variant="h2" className="text-gray-900 mb-4">
                Error al cargar las categorías
              </Title>
              <Text variant="p" className="text-gray-600 mb-8 text-lg">
                {error.message || "Ocurrió un problema al cargar las categorías del blog."}
              </Text>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-lg font-medium transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-lime-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Centro de conocimiento ecológico
              </div>

              <Title variant="h1" className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Blog <span className="text-lime-600">Ekoru</span>
              </Title>

              <Text variant="p" className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Descubre artículos sobre sostenibilidad, medio ambiente, reciclaje y vida ecológica. Únete a nuestra
                comunidad y aprende cómo hacer la diferencia para nuestro planeta.
              </Text>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 mt-12">
                <div className="text-center max-w-[120px] sm:max-w-[180px]">
                  <div className="w-16 h-16 mx-auto mb-4 bg-lime-100 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-lime-600" />
                  </div>
                  <Title variant="h3" className="text-2xl font-bold text-gray-900 mb-2">
                    {categories.length}
                  </Title>
                  <Text variant="p" className="text-gray-600">
                    Categorías especializadas
                  </Text>
                </div>

                <div className="text-center max-w-[120px] sm:max-w-[180px]">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <Title variant="h3" className="text-2xl font-bold text-gray-900 mb-2">
                    {categories.reduce((sum, category) => sum + category.posts.length, 0)}
                  </Title>
                  <Text variant="p" className="text-gray-600">
                    Artículos publicados
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="relative max-w-7xl mx-auto px-4 pb-16">
          <div className="mb-12">
            <Title variant="h2" className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Explora nuestras categorías
            </Title>
            <Text variant="p" className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Encuentra artículos organizados por temas que te interesan y profundiza en el conocimiento ecológico
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <Link key={category.id} href={`/blog-ekoru/${category.href}`} className="group block">
                  <article className="bg-white rounded-2xl border border-gray-100 hover:border-lime-200 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-lime-100/50 hover:-translate-y-1">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <Title
                        variant="h3"
                        className="text-xl font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors"
                      >
                        {category.name}
                      </Title>
                      <Text variant="p" className="text-gray-600 leading-relaxed line-clamp-3">
                        {category.description}
                      </Text>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Notebook className="w-4 h-4 mr-1" />
                        <span>{category.posts.length}</span>
                      </div>

                      <div className="inline-flex items-center text-lime-600 font-medium text-sm group-hover:text-lime-700 transition-colors">
                        Explorar
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-lime-600 to-lime-700 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="relative">
              <Title variant="h2" className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                ¿Tienes una historia que contar?
              </Title>
              <Text variant="p" className="text-xl text-lime-50 mb-8 max-w-2xl mx-auto">
                Escríbenos a{" "}
                <a href="mailto:contacto@ekoru.com" className="underline">
                  contacto@ekoru.com
                </a>{" "}
                y obtén más información sobre cómo unirte a nuestra comunidad de escritores y comparte tus conocimientos
                sobre sostenibilidad y medio ambiente
              </Text>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
