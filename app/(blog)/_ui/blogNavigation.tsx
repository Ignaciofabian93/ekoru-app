import { usePathname } from "next/navigation";
import { Book, File, Home, Tags, Users2 } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function BlogNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/blog" && pathname === "/blog") return true;
    if (path !== "/blog" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Inicio", href: "/blog", icon: <Home className="h-5 w-5 text-primary" /> },
    { label: "Todas las publicaciones", href: "/blog/posts", icon: <Book className="h-5 w-5 text-primary" /> },
    { label: "Categorías", href: "/blog/categories", icon: <File className="h-5 w-5 text-primary" /> },
    { label: "Autores", href: "/blog/authors", icon: <Users2 className="h-5 w-5 text-primary" /> },
    { label: "Etiquetas", href: "/blog/tags", icon: <Tags className="h-5 w-5 text-primary" /> },
  ];

  return (
    <nav className={clsx("bg-subheader-light dark:bg-subheader-dark-900", "mb-12")}>
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-8 px-4 min-w-max md:justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center justify-start gap-3 py-2 px-3 mt-4 border-b-2 whitespace-nowrap flex-shrink-0",
                "hover:border-b-stone-800 dark:hover:border-b-white",
                "transition-colors duration-300 ease-in-out",
                {
                  "border-b-stone-800 dark:border-b-white": isActive(item.href),
                  "border-b-transparent": !isActive(item.href),
                }
              )}
            >
              <span>{item.icon}</span>
              <span className="text-text-800 dark:text-text-100 text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
