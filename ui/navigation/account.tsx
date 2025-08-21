import { UserRound } from "lucide-react";
import Link from "next/link";
import MainButton from "@/ui/buttons/mainButton";

type Props = {
  isLoggedIn?: boolean;
};

const LoggedInMenu = () => {
  return (
    <>
      <Link
        href="/profile"
        className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
      >
        Mi Perfil
      </Link>
      <Link
        href="/profile/orders"
        className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
      >
        Mis Órdenes
      </Link>
      <Link
        href="/profile/impact-dashboard"
        className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
      >
        Mi Impacto
      </Link>
      <Link
        href="/profile/settings"
        className="block px-4 py-2 text-text-primary hover:bg-neutral-light transition-colors"
      >
        Ajustes
      </Link>
      <hr className="my-2 border-neutral/20" />
      <button>Cerrar Sesión</button>
    </>
  );
};

const NotLoggedInMenu = () => {
  return (
    <div className="flex flex-col items-center space-y-3 px-4 py-2">
      <span className="text-center text-base text-text-primary mb-4">
        ¡Bienvenido! Inicia sesión o crea una cuenta para empezar a circular.
      </span>
      <Link href="/login" className="w-full">
        <MainButton text="Iniciar Sesión" variant="primary" hasIcon={false} />
      </Link>
      <Link href="/register" className="w-full">
        <MainButton text="Crear Cuenta" variant="outline" hasIcon={false} />
      </Link>
    </div>
  );
};

export default function AccountMenu({ isLoggedIn }: Props) {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 p-2 text-white hover:text-primary transition-colors duration-200">
        <UserRound className="h-6 w-6" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-2">
          {isLoggedIn ? <LoggedInMenu /> : <NotLoggedInMenu />}
        </div>
      </div>
    </div>
  );
}
