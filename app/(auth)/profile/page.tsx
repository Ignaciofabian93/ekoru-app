"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  BarChart3,
  Package,
  Calendar,
  Award,
  Leaf,
  TrendingUp,
  Eye,
  Clock,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import useSessionStore from "@/store/session";

export default function ProfilePage() {
  const { data } = useSessionStore();
  console.log("data:: ", data);

  // const [user] = useState({
  //   name: "María González",
  //   email: "maria.gonzalez@email.com",
  //   phone: "+1 234 567 8900",
  //   location: "Barcelona, España",
  //   joinDate: "Marzo 2024",
  //   avatar: "/brand/icon.webp", // Using existing brand icon as placeholder
  //   bio: "Apasionada por la sostenibilidad y el consumo consciente. Me encanta descubrir productos ecológicos que hacen la diferencia.",
  //   verified: true,
  // });

  // Mock data for stats
  const stats = {
    orders: 12,
    favorites: 45,
    impact: {
      co2Saved: 127.5,
      waterSaved: 2340,
      wasteDiverted: 18.2,
    },
    listings: 3,
  };

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      title: "Compró Detergente Ecológico Orgánico 1L",
      date: "Hace 2 días",
      icon: ShoppingBag,
    },
    {
      id: 2,
      type: "favorite",
      title: "Añadió Jabón Natural de Lavanda a favoritos",
      date: "Hace 4 días",
      icon: Heart,
    },
    {
      id: 3,
      type: "review",
      title: "Escribió una reseña para Bolsas Reutilizables de Algodón",
      date: "Hace 1 semana",
      icon: Award,
    },
    {
      id: 4,
      type: "listing",
      title: "Publicó Macetas de Bambú (intercambio)",
      date: "Hace 2 semanas",
      icon: Package,
    },
  ];

  const quickActions = [
    {
      title: "Mis Pedidos",
      description: `${stats.orders} pedidos realizados`,
      href: "/profile/orders",
      icon: ShoppingBag,
      color: "bg-blue-500",
      stats: stats.orders,
    },
    {
      title: "Favoritos",
      description: `${stats.favorites} productos guardados`,
      href: "/profile/favorites",
      icon: Heart,
      color: "bg-red-500",
      stats: stats.favorites,
    },
    {
      title: "Dashboard de Impacto",
      description: `${stats.impact.co2Saved} kg CO₂ ahorrado`,
      href: "/profile/impact-dashboard",
      icon: Leaf,
      color: "bg-green-500",
      stats: `${stats.impact.co2Saved}kg`,
    },
    {
      title: "Mis Productos",
      description: `${stats.listings} productos publicados`,
      href: "/profile/my-products",
      icon: Package,
      color: "bg-purple-500",
      stats: stats.listings,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-light/20 to-white">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
                  {/* <Image
                    src={user.avatar}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                {/* {user.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2 border-4 border-white">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )} */}
                <button className="absolute top-0 right-0 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-black/30 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">
                    {data?.profile?.displayName}
                  </h1>
                  {/* {user.verified && (
                    <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <Shield className="w-4 h-4 mr-1" />
                      Verificado
                    </span>
                  )} */}
                </div>
                {/* <p className="text-white/80 text-lg mb-4 max-w-2xl">
                  {user.bio}
                </p> */}
                {/* <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/70">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {user.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Miembro desde {user.joinDate}
                  </div>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/profile/settings"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-neutral-light transition-colors duration-200"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Configurar Perfil
                </Link>
                <button className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors duration-200 border border-white/30">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificaciones
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions Grid */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Acceso Rápido
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <Link
                        key={action.title}
                        href={action.href}
                        className="group bg-white rounded-xl shadow-sm border border-neutral/20 p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`${action.color} rounded-lg p-3`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                            {action.stats}
                          </span>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-text-muted text-sm">
                          {action.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Environmental Impact Summary */}
              <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="bg-primary rounded-lg p-3 mr-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      Tu Impacto Ecológico
                    </h3>
                    <p className="text-text-muted">
                      Contribución al medio ambiente este mes
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {stats.impact.co2Saved} kg
                    </div>
                    <div className="text-sm text-text-muted">CO₂ Ahorrado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-info mb-1">
                      {stats.impact.waterSaved} L
                    </div>
                    <div className="text-sm text-text-muted">Agua Ahorrada</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      {stats.impact.wasteDiverted} kg
                    </div>
                    <div className="text-sm text-text-muted">
                      Residuos Evitados
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <Link
                    href="/profile/impact-dashboard"
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Ver impacto detallado
                    <TrendingUp className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">
                    Actividad Reciente
                  </h2>
                  <Link
                    href="/profile/activity"
                    className="text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Ver todo
                  </Link>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-neutral/20">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className={`p-4 flex items-center ${
                          index !== recentActivity.length - 1
                            ? "border-b border-neutral/10"
                            : ""
                        }`}
                      >
                        <div className="bg-neutral-light rounded-lg p-2 mr-4">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text-primary">
                            {activity.title}
                          </p>
                          <div className="flex items-center text-text-muted text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Profile Navigation & Additional Info */}
            <div className="space-y-8">
              {/* Profile Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Gestionar Perfil
                </h3>
                <nav className="space-y-2">
                  {[
                    {
                      title: "Información Personal",
                      href: "/profile/settings",
                      icon: User,
                    },
                    {
                      title: "Pedidos",
                      href: "/profile/orders",
                      icon: ShoppingBag,
                    },
                    {
                      title: "Lista de Deseos",
                      href: "/profile/favorites",
                      icon: Heart,
                    },
                    {
                      title: "Mis Productos",
                      href: "/profile/my-products",
                      icon: Package,
                    },
                    {
                      title: "Dashboard de Impacto",
                      href: "/profile/impact-dashboard",
                      icon: BarChart3,
                    },
                    {
                      title: "Métodos de Pago",
                      href: "/profile/payment-methods",
                      icon: CreditCard,
                    },
                    {
                      title: "Configuración",
                      href: "/profile/settings",
                      icon: Settings,
                    },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group"
                      >
                        <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                        <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Achievement Badge */}
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Eco-Warrior Certificado
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Has ahorrado más de 100kg de CO₂ este mes. ¡Sigue así!
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">
                        Progreso al siguiente nivel
                      </span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Perfil visitado</span>
                    <div className="flex items-center text-text-primary">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="font-medium">1,247 veces</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Miembro desde</span>
                    <div className="flex items-center text-text-primary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {/* <span className="font-medium">{user.joinDate}</span> */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Reseñas escritas</span>
                    <div className="flex items-center text-text-primary">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="font-medium">23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
