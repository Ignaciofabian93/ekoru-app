import {
  PersonProfile,
  Seller,
  ServiceProfile,
  StoreProfile,
} from "@/types/user";
import {
  Bell,
  Calendar,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Seller;
};

export default function ProfileHeader({ data }: Props) {
  const profileImage =
    data.profile?.__typename === "PersonProfile"
      ? data.profile?.profileImage
      : "/brand/icon.webp";
  const logo =
    data.profile?.__typename !== "PersonProfile"
      ? data.profile?.logo
      : "/brand/icon.webp";
  const isPerson = data.sellerType === "PERSON";

  return (
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
  );
}
