"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Settings,
  Calendar,
  Award,
  Eye,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Bell,
  Shield,
  Save,
} from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import useSessionStore from "@/store/session";
import { PersonProfile, ServiceProfile, StoreProfile } from "@/types/user";
import { profileMenu } from "./_constants/data";
import clsx from "clsx";
import Modal from "@/ui/modals/modal";
import { motion } from "framer-motion";
import MainButton from "@/ui/buttons/mainButton";
import usePersonalInfoStore from "./_store/personalInfo";
import QuickActions from "./_ui/quickActions";
import ImpactSummary from "./_ui/impactSummary";
import RecentActivity from "./_ui/recentActivity";

export default function ProfilePage() {
  const { data } = useSessionStore();
  const { mode, isOpen, onClose, openModal } = usePersonalInfoStore();
  console.log("data:: ", data);

  const profileImage =
    data.profile?.__typename === "PersonProfile"
      ? data.profile?.profileImage
      : "/brand/icon.webp";
  const logo =
    data.profile?.__typename !== "PersonProfile"
      ? data.profile?.logo
      : "/brand/icon.webp";
  // const coverImage = data.profile?.coverImage || "/brand/cover-photo.jpg";

  const isPerson = data.sellerType === "PERSON";

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
                  <Image
                    src={
                      isPerson
                        ? profileImage ?? "/brand/icon.webp"
                        : logo ?? "/brand/icon.webp"
                    }
                    alt={data.profile?.displayName || "Profile Image"}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                {data.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2 border-4 border-white">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
                <button className="absolute top-0 right-0 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-black/30 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">
                    {isPerson
                      ? (data.profile as PersonProfile)?.displayName ||
                        (data.profile as PersonProfile)?.firstName
                      : (data.profile as StoreProfile | ServiceProfile)
                          ?.businessName}
                  </h1>
                  {data.isVerified && (
                    <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <Shield className="w-4 h-4 mr-1" />
                      Verificado
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-lg mb-4 max-w-2xl">
                  {isPerson
                    ? (data.profile as PersonProfile)?.bio || "Sin biografía."
                    : (data.profile as StoreProfile | ServiceProfile)
                        ?.description || "Sin descripción."}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/70">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {data.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {data.phone || "Sin teléfono registrado"}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {data.address || "Sin dirección registrada"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Miembro desde {data.createdAt.split("T")[0]}
                  </div>
                </div>
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
              <QuickActions />

              {/* Environmental Impact Summary */}
              <ImpactSummary />

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Right Column - Profile Navigation & Additional Info */}
            <div className="space-y-8">
              {/* Profile Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Gestionar Perfil
                </h3>
                <nav className="space-y-2">
                  {profileMenu.map((item) => {
                    const IconComponent = item.icon;
                    if (item.name === "personalInfo") {
                      return (
                        <button
                          key={item.name}
                          onClick={openModal}
                          className={clsx(
                            "flex w-full items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                            {
                              "opacity-50 pointer-events-none": !item.enabled,
                            }
                          )}
                        >
                          <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                          <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className={clsx(
                            "flex items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                            {
                              "opacity-50 pointer-events-none": !item.enabled,
                            }
                          )}
                        >
                          <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                          <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                            {item.title}
                          </span>
                        </Link>
                      );
                    }
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={"Editar Perfil"}
        size="lg"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-sm text-gray-600">
            {mode === "create"
              ? "Fill in the details to add a new product to your store."
              : "Update the product information below."}
          </div>
          <p>jashsjhasjas</p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex justify-end space-x-3 pt-4 border-t border-gray-200"
          >
            <MainButton
              text="Cancelar"
              onClick={onClose}
              disabled={false}
              variant="outline"
              hasIcon={false}
            />
            <MainButton
              text={"Actualizar Perfil"}
              variant="primary"
              onClick={() => {
                console.log("Main button clicked");
              }}
              hasIcon
              icon={Save}
            />
          </motion.div>
        </motion.div>
      </Modal>
    </MainLayout>
  );
}
