import { Department } from "@/types/product";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Heart,
  House,
  LogOut,
  LucideIcon,
  Package,
  ShoppingCart,
  Store,
  Users,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import MainButton from "../buttons/mainButton";
import useLogout from "@/hooks/useLogout";
import useRedirect from "@/hooks/useRedirect";
import { PersonProfile, Seller, StoreProfile, ServiceProfile } from "@/types/user";
import Image from "next/image";
import { Title } from "../text/title";
import clsx from "clsx";
import { Text } from "../text/text";
import { BlogCategories } from "@/types/blog";

type Props = {
  closeMobileMenu: () => void;
  openAccordion?: string | null;
  toggleAccordion: (section: string) => void;
  marketData?: {
    marketCatalog: Array<Department>;
  } | null;
  storeData?: {
    storeCatalog: Array<Seller>;
  } | null;
  blogData?: {
    blogCategories: Array<BlogCategories>;
  } | null;
  openDepartment: number | null;
  toggleDepartment: (departmentId: number) => void;
  openCategory: number | null;
  toggleCategory: (categoryId: number) => void;
  isLoggedIn?: boolean;
  data?: Seller | null;
};

type NavigationButtonProps = {
  openAccordion: string | null;
  toggleAccordion: (section: string) => void;
  label: string;
  icon: LucideIcon;
};

const NavigationButton = ({ openAccordion, toggleAccordion, label, icon }: NavigationButtonProps) => {
  const Icon: LucideIcon = icon;
  return (
    <button
      onClick={() => toggleAccordion("blog")}
      className="w-full flex items-center justify-between p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
    >
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 text-primary" />
        <Text variant="label" className="font-medium">
          {label}
        </Text>
      </div>
      <ChevronDown
        className={`h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200 ${
          openAccordion === "blog" ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default function SideMobileMenu({
  closeMobileMenu,
  openAccordion,
  toggleAccordion,
  marketData,
  blogData,
  openDepartment,
  toggleDepartment,
  openCategory,
  toggleCategory,
  isLoggedIn = false,
  data = null,
}: Props) {
  const { handleLogout } = useLogout();
  const { redirectTo } = useRedirect();

  const isPerson = data?.sellerType === "PERSON";

  const personName =
    data && (data?.profile as PersonProfile)?.displayName
      ? (data?.profile as PersonProfile)?.displayName
      : `${(data?.profile as PersonProfile)?.firstName} ${(data?.profile as PersonProfile)?.lastName}`;
  const businessDisplayName =
    data && ((data?.profile as StoreProfile) || (data?.profile as ServiceProfile))?.displayName;

  const profileImage = isPerson ? (data?.profile as PersonProfile)?.profileImage : "/brand/icon.webp";
  const logo = !isPerson
    ? ((data?.profile as StoreProfile) || (data?.profile as ServiceProfile))?.logo
    : "/brand/icon.webp";

  const profileNavigation = [
    { name: "Perfil", href: "/profile" },
    { name: "Pedidos", href: "/profile/orders" },
    { name: "Impacto", href: "/profile/impact-dashboard" },
    { name: "Ajustes", href: "/profile/settings" },
  ];

  const AccordionWrapper = ({ children }: { children: React.ReactNode }) => (
    <article className="border-b border-neutral/10 last:border-b-0">{children}</article>
  );

  const AccordionListWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden bg-card-light-100/40 dark:bg-card-dark-800 rounded-lg mt-1"
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="relative w-[70%] max-w-sm h-full bg-container-light-50 dark:bg-container-dark-900 shadow-2xl"
    >
      {/* Menu Header */}
      <div
        className={clsx(
          "flex items-center justify-between p-4",
          "border-b border-neutral-300 dark:border-neutral-700",
          "bg-navbar-light-100/20 dark:bg-navbar-dark-800"
        )}
      >
        <Title variant="h5" className="font-semibold">
          Menú
        </Title>
        <button
          onClick={closeMobileMenu}
          className="p-2 text-title-700 dark:text-title-200 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Menu Content */}
      <aside className="h-full overflow-y-auto pb-20 scrollbar-hide">
        {/* User Section */}
        <section
          className={clsx(
            "p-4",
            "border-b border-neutral-300 dark:border-neutral-700 bg-card-light-100 dark:bg-card-dark-800"
          )}
        >
          <div className="flex flex-col items-center space-x-3 mb-3">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
              {isPerson ? (
                <Image
                  src={profileImage as string}
                  alt="imagen de perfil"
                  width={40}
                  height={40}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={logo as string}
                  alt="imagen de perfil"
                  width={40}
                  height={40}
                  className="rounded-full w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-center w-full mt-2">
              <p className="font-medium text-title-800 dark:text-title-200">
                {isPerson ? personName : businessDisplayName}
              </p>
              <p className="text-sm text-text-600 dark:text-text-400">{data?.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            {profileNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center px-3 py-2 text-sm text-text-700 dark:text-text-300 hover:bg-container-light-200 dark:hover:bg-container-dark-700 hover:text-primary transition-colors rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation Links with Accordion */}
        <section className="p-4 space-y-1">
          <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
            Navegación
          </Title>

          <div className="border-b border-neutral/10 last:border-b-0">
            <button
              onClick={() => redirectTo("/feed")}
              className="w-full flex items-center justify-start p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
            >
              <House className="h-5 w-5 mr-3 text-primary" />
              <Text variant="span" className="font-medium text-title-700 dark:text-title-300">
                Inicio
              </Text>
            </button>
          </div>

          {/* Mercado Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("mercado")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-title-700 dark:text-title-300">Mercado</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                  openAccordion === "mercado" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openAccordion === "mercado" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-card-light-200 dark:bg-card-dark-700 rounded-lg mt-1"
                >
                  {Array.isArray(marketData?.marketCatalog) &&
                    marketData?.marketCatalog.map(({ id, departmentName, departmentCategories }) => (
                      <div key={id} className="border-b border-neutral/5 last:border-b-0">
                        <button
                          onClick={() => toggleDepartment(id)}
                          className="w-full flex items-center justify-between p-2 pl-6 text-left hover:bg-container-light-300 dark:hover:bg-container-dark-600 transition-colors"
                        >
                          <span className="text-sm text-text-600 dark:text-text-400">{departmentName}</span>
                          <ChevronRight
                            className={`h-3 w-3 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                              openDepartment === id ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openDepartment === id && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-container-light-300 dark:bg-container-dark-600"
                            >
                              {departmentCategories.map(({ departmentCategoryName, productCategories, id }) => (
                                <div key={id}>
                                  <button
                                    onClick={() => toggleCategory(id)}
                                    className="w-full flex items-center justify-between p-2 pl-10 text-left hover:bg-container-light-400 dark:hover:bg-container-dark-500 transition-colors"
                                  >
                                    <span className="text-xs text-text-500 dark:text-text-400">
                                      {departmentCategoryName}
                                    </span>
                                    <ChevronRight
                                      className={`h-3 w-3 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                                        openCategory === id ? "rotate-90" : ""
                                      }`}
                                    />
                                  </button>{" "}
                                  <AnimatePresence>
                                    {openCategory === id && (
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{
                                          duration: 0.2,
                                        }}
                                        className="overflow-hidden bg-container-light-400 dark:bg-container-dark-500"
                                      >
                                        {productCategories.map(({ id, productCategoryName }) => (
                                          <Link
                                            key={id}
                                            href={`/market/category/${id}`}
                                            onClick={closeMobileMenu}
                                            className="block p-2 pl-14 text-xs text-text-500 dark:text-text-400 hover:text-primary hover:bg-primary/10 transition-colors"
                                          >
                                            {productCategoryName}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>

          {/* Tiendas Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("tiendas")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-title-700 dark:text-title-300">Tiendas</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                  openAccordion === "tiendas" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openAccordion === "tiendas" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                >
                  {/* {storeCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/stores?category=${category.id}`}
                      onClick={closeMobileMenu}
                      className="block p-3 pl-6 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-text-secondary mb-1">{category.title}</h4>
                      <p className="text-xs text-text-muted">{category.description}</p>
                    </Link>
                  ))} */}
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>

          {/* Servicios Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("servicios")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Wrench className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-title-700 dark:text-title-300">Servicios</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                  openAccordion === "servicios" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openAccordion === "servicios" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                >
                  {/* {serviceCategories.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services?category=${service.id}`}
                      onClick={closeMobileMenu}
                      className="block p-3 pl-6 border-b border-neutral/5 last:border-b-0 hover:bg-white/50 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-text-secondary mb-1">{service.title}</h4>
                      <p className="text-xs text-text-muted">{service.description}</p>
                    </Link>
                  ))} */}
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>

          {/* Comunidad Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("comunidad")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-card-light-200 dark:hover:bg-card-dark-700 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-title-700 dark:text-title-300">Comunidad</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-text-500 dark:text-text-400 transition-transform duration-200 ${
                  openAccordion === "comunidad" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openAccordion === "comunidad" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-card-light-200 dark:bg-card-dark-700 rounded-lg mt-1"
                >
                  <Link
                    href="/community/forums"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral-300 dark:border-neutral-600 hover:bg-container-light-300 dark:hover:bg-container-dark-600 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-700 dark:text-text-300 mb-1">Foros</h4>
                    <p className="text-xs text-text-500 dark:text-text-400">Discute temas ambientales</p>
                  </Link>
                  <Link
                    href="/community/events"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral-300 dark:border-neutral-600 hover:bg-container-light-300 dark:hover:bg-container-dark-600 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-700 dark:text-text-300 mb-1">Eventos</h4>
                    <p className="text-xs text-text-500 dark:text-text-400">Actividades ecológicas</p>
                  </Link>
                  <Link
                    href="/community/groups"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 hover:bg-container-light-300 dark:hover:bg-container-dark-600 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-700 dark:text-text-300 mb-1">Grupos</h4>
                    <p className="text-xs text-text-500 dark:text-text-400">Únete a comunidades</p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>

          {/* Blog Accordion */}
          <AccordionWrapper>
            <NavigationButton
              openAccordion={openAccordion ?? null}
              toggleAccordion={toggleAccordion}
              label="Blog"
              icon={BookOpen}
            />
            <AnimatePresence>
              {openAccordion === "blog" && (
                <AccordionListWrapper>
                  {Array.isArray(blogData?.blogCategories) &&
                    blogData?.blogCategories.map(({ id, name }) => (
                      <Link
                        key={id}
                        href={`/ekoru-blog/categories/${id}`}
                        onClick={closeMobileMenu}
                        className={clsx(
                          "block p-3 pl-6",
                          "border-b border-neutral-300 dark:border-neutral-600",
                          "hover:bg-container-light-200 dark:hover:bg-container-dark-600",
                          "transition-colors"
                        )}
                      >
                        <Text variant="span" className="font-medium mb-1">
                          {name}
                        </Text>
                      </Link>
                    ))}
                </AccordionListWrapper>
              )}
            </AnimatePresence>
          </AccordionWrapper>
        </section>

        {/* Quick Actions */}
        <section className="p-4 border-t border-neutral-300 dark:border-neutral-700">
          <h3 className="text-sm font-semibold text-text-600 dark:text-text-400 uppercase tracking-wide mb-3">
            Acciones Rápidas
          </h3>
          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className="flex items-center justify-between px-3 py-3 text-title-700 dark:text-title-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg border border-neutral-300 dark:border-neutral-600"
            >
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-3 text-primary" />
                <span>Carrito de Compras</span>
              </div>
              <span className="bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link
              href="/profile/favorites"
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-3 text-title-700 dark:text-title-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg border border-neutral-300 dark:border-neutral-600"
            >
              <Heart className="h-5 w-5 mr-3 text-primary" />
              <span>Lista de favoritos</span>
            </Link>
          </div>
        </section>

        {/* Settings & Support */}
        <section className="p-4 border-t border-neutral-300 dark:border-neutral-700">
          <h3 className="text-sm font-semibold text-text-600 dark:text-text-400 uppercase tracking-wide mb-3">
            Soporte
          </h3>
          <div className="space-y-1">
            <Link
              href="/help"
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-2 text-sm text-text-700 dark:text-text-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg"
            >
              Centro de Ayuda
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-2 text-sm text-text-700 dark:text-text-300 hover:bg-card-light-200 dark:hover:bg-card-dark-700 hover:text-primary transition-colors rounded-lg"
            >
              Contacto
            </Link>
          </div>
        </section>

        {/* Sign In/Out */}
        <div className="p-4 border-t border-neutral-300 dark:border-neutral-700">
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
