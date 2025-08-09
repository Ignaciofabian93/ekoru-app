import Link from "next/link";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  backgroundColor?: string;
};

export default function HorizontalScrollSection({
  children,
  title,
  description,
  backgroundColor = "bg-primary-light/20",
}: Props) {
  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {title}
            </h2>
            <p className="text-text-muted">{description}</p>
          </div>
          <Link
            href="/products/exchange"
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Ver todos
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {children}
        </div>
      </div>
    </section>
  );
}
