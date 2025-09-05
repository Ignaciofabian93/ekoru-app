import {
  BarChart3,
  CreditCard,
  Heart,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

export const profileMenu = [
  {
    title: "Información Personal",
    name: "personalInfo",
    href: "/profile",
    icon: User,
    enabled: process.env.NEXT_PUBLIC_ENABLE_PERSONAL_INFO === "true",
  },
  {
    title: "Mis Productos",
    name: "myProducts",
    href: "/profile/my-products",
    icon: Package,
    enabled: process.env.NEXT_PUBLIC_ENABLE_MY_PRODUCTS === "true",
  },
  {
    title: "Pedidos",
    name: "orders",
    href: "/profile/orders",
    icon: ShoppingBag,
    enabled: process.env.NEXT_PUBLIC_ENABLE_MY_ORDERS === "true",
  },
  {
    title: "Lista de Deseos",
    name: "favorites",
    href: "/profile/favorites",
    icon: Heart,
    enabled: process.env.NEXT_PUBLIC_ENABLE_MY_FAVORITES === "true",
  },
  {
    title: "Dashboard de Impacto",
    name: "impactDashboard",
    href: "/profile/impact-dashboard",
    icon: BarChart3,
    enabled: process.env.NEXT_PUBLIC_ENABLE_MY_IMPACT_DASHBOARD === "true",
  },
  {
    title: "Métodos de Pago",
    name: "paymentMethods",
    href: "/profile/payment-methods",
    icon: CreditCard,
    enabled: process.env.NEXT_PUBLIC_ENABLE_PAYMENT_METHODS === "true",
  },
  {
    title: "Configuración",
    name: "settings",
    href: "/profile/settings",
    icon: Settings,
    enabled: process.env.NEXT_PUBLIC_ENABLE_MY_SETTINGS === "true",
  },
];
