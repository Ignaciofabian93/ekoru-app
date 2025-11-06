import { Text } from "@/ui/text/text";
import { Title } from "@/ui/text/title";
import { CircleAlert } from "lucide-react";

export const EmptyContent = () => {
  return (
    <section className="text-center py-16">
      <div className="mb-6 flex items-center justify-center">
        <CircleAlert className="w-12 h-12 text-gray-400" />
      </div>
      <Title variant="h3" className="font-bold mb-4">
        No hay artículos disponibles
      </Title>
      <Text variant="p" className="mb-8">
        Aún no hay artículos publicados en esta categoría. ¡Vuelve pronto para más contenido!
      </Text>
    </section>
  );
};
