import { motion } from "motion/react";
import { Seller } from "@/types/user";
import { LogOut } from "lucide-react";
import { SideBarHeader } from "./components/sidebarHeader";
import { SideBarProfile } from "./sidebarProfile";
import MainButton from "../buttons/mainButton";
import useLogout from "@/hooks/useLogout";
import useRedirect from "@/hooks/useRedirect";
import QuickActions from "./quickActions";
import Support from "./support";
import clsx from "clsx";
import SidebarNavigation from "./sidebarNavigation";

type Props = {
  closeMobileMenu: () => void;
  isLoggedIn?: boolean;
  data?: Seller | null;
};

export default function SideMobileMenu({ closeMobileMenu, isLoggedIn = false, data = null }: Props) {
  const { handleLogout } = useLogout();
  const { redirectTo } = useRedirect();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={clsx(
        "relative w-[70%] max-w-sm h-full",
        "shadow-2xl",
        "bg-sidebar-container-light",
        "dark:bg-sidebar-container-dark"
      )}
    >
      {/* Menu Header */}
      <SideBarHeader closeMobileMenu={closeMobileMenu} />

      {/* Scrollable Menu Content */}
      <aside className="h-full overflow-y-auto pb-20 scrollbar-hide">
        {/* User Section */}
        {isLoggedIn && <SideBarProfile data={data} closeMobileMenu={closeMobileMenu} />}

        {/* Navigation Links with Accordion */}
        <SidebarNavigation closeMobileMenu={closeMobileMenu} />
        {/* Quick Actions */}
        {isLoggedIn && <QuickActions closeMobileMenu={closeMobileMenu} />}

        {/* Support */}
        <Support closeMobileMenu={closeMobileMenu} />

        {/* Sign In/Out */}
        <div className="p-4 border-t">
          {isLoggedIn ? (
            <MainButton text="Cerrar Sesión" variant="destructive" onClick={handleLogout} icon={LogOut} />
          ) : (
            <MainButton text="Iniciar Sesión" variant="primary" onClick={() => redirectTo("/login")} />
          )}
        </div>
      </aside>
    </motion.div>
  );
}
