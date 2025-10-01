"use client";
import MainLayout from "@/ui/layout/mainLayout";
import BlogNavigation from "@/app/(blog)/_ui/blogNavigation";
import Container from "@/ui/layout/container";
import { Title } from "@/ui/text/title";
import { Text } from "@/ui/text/text";
import useBlogCategories from "../../_hooks/useBlogCategories";
import CategoryCard from "../../_ui/categoryCard";

export default function CategoriesPage() {
  const { loadingCategories, categories } = useBlogCategories();
  console.log(loadingCategories, categories);

  return (
    <MainLayout>
      {/* Navigation */}
      <BlogNavigation />

      <Container>
        {/* Page Header */}
        <Title variant="h2" className="mb-6">
          Categorías
        </Title>
        <Text variant="p" className="text-center mb-12 max-w-2xl">
          Explora nuestros temas ambientales y de sostenibilidad. Encuentra artículos sobre todo, desde reciclaje y
          reutilización hasta vida sustentable e impacto ambiental. Además encontrarás consejos y tips de seguridad
          informática para proteger tu información en línea.
        </Text>

        {/* Categories Grid */}
        <Container>
          <div className="flex flex-wrap gap-6 justify-evenly">
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </Container>
    </MainLayout>
  );
}
