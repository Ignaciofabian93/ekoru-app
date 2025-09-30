import Link from "next/link";
import { usePathname } from "next/navigation";

interface BlogNavigationProps {
  className?: string;
}

export default function BlogNavigation({ className = "" }: BlogNavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/blog" && pathname === "/blog") return true;
    if (path !== "/blog" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Blog Home", href: "/blog", icon: "🏠" },
    { label: "All Posts", href: "/blog/posts", icon: "📝" },
    { label: "Categories", href: "/blog/categories", icon: "📁" },
    { label: "Authors", href: "/blog/authors", icon: "👥" },
    { label: "Tags", href: "/blog/tags", icon: "🏷️" },
  ];

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 whitespace-nowrap text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
