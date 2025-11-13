import { Department } from "@/types/product";
import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import { ChevronRight, Grid3x3, Home, Package, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  department: Department;
  totalSubcategories: number;
};

export const DepartmentHeader = ({ department, totalSubcategories }: HeaderProps) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-8">
        <Link href="/feed" className="hover:text-primary transition-colors flex items-center group">
          <Home className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
          Inicio
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary font-medium">{department.departmentName}</span>
      </nav>

      {/* Header Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 p-3 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <Title variant="h1" className="font-bold">
              {department.departmentName}
            </Title>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
            <Grid3x3 className="w-4 h-4 text-primary" />
            <Text variant="span">
              <b>{department.departmentCategory?.length || 0}</b> categorías
            </Text>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
            <Package className="w-4 h-4 text-primary" />
            <Text variant="span">
              <b>{totalSubcategories}</b> subcategorías
            </Text>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-700">
            <Tag className="w-4 h-4 text-lime-600" />
            <Text variant="span" className="text-lime-700 font-medium">
              Comercio sustentable
            </Text>
          </div>
        </div>

        <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={"/brand/logo.webp"}
            alt={department.departmentName}
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />
        </div>
      </section>
    </>
  );
};
