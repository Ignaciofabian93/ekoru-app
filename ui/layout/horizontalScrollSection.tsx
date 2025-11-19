import Link from "next/link";
import { Title } from "../text/title";
import { Text } from "../text/text";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
  href: string;
};

export default function HorizontalScrollSection({
  children,
  title,
  description,
  backgroundColor = "bg-primary-light/20",
  href,
}: Props) {
  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <div className="mb-4 flex flex-col items-start gap-1">
            <Title variant="h2" className="font-bold">
              {title}
            </Title>
            <Text variant="p">{description}</Text>
          </div>
          <Link
            href={href}
            className="text-primary hover:text-primary-dark text-sm text-start font-medium transition-colors"
          >
            Ver todos
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">{children}</div>
      </div>
    </section>
  );
}
