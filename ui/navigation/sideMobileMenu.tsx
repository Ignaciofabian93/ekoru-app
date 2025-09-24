import { Department } from "@/types/product";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Heart,
  House,
  LogOut,
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

type Props = {
  closeMobileMenu: () => void;
  openAccordion?: string | null;
  toggleAccordion: (section: string) => void;
  marketData?: {
    marketCatalog: Array<Department>;
  } | null;
  openDepartment: number | null;
  toggleDepartment: (departmentId: number) => void;
  openCategory: number | null;
  toggleCategory: (categoryId: number) => void;
  isLoggedIn?: boolean;
  data?: Seller | null;
};

export default function SideMobileMenu({
  closeMobileMenu,
  openAccordion,
  toggleAccordion,
  marketData,
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

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="relative w-[70%] max-w-sm h-full bg-white shadow-2xl"
    >
      {/* Menu Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral/20 bg-gradient-to-r from-primary/5 to-primary-dark/5">
        <h2 className="text-lg font-semibold text-text-primary">Menú</h2>
        <button
          onClick={closeMobileMenu}
          className="p-2 text-neutral hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Menu Content */}
      <aside className="h-full overflow-y-auto pb-20">
        {/* User Section */}
        <section className="p-4 border-b border-neutral/10 bg-neutral-light/30">
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
              <p className="font-medium text-text-primary">{isPerson ? personName : businessDisplayName}</p>
              <p className="text-sm text-text-muted">{data?.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            {profileNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-white hover:text-primary transition-colors rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation Links with Accordion */}
        <section className="p-4 space-y-1">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">Navegación</h3>

          <div className="border-b border-neutral/10 last:border-b-0">
            <button
              onClick={() => redirectTo("/feed")}
              className="w-full flex items-center justify-start p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <House className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-text-primary">Inicio</span>
            </button>
          </div>

          {/* Mercado Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("mercado")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-text-primary">Mercado</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral transition-transform duration-200 ${
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
                  className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                >
                  {Array.isArray(marketData?.marketCatalog) &&
                    marketData?.marketCatalog.map(({ id, departmentName, departmentCategories }) => (
                      <div key={id} className="border-b border-neutral/5 last:border-b-0">
                        <button
                          onClick={() => toggleDepartment(id)}
                          className="w-full flex items-center justify-between p-2 pl-6 text-left hover:bg-white/50 transition-colors"
                        >
                          <span className="text-sm text-text-secondary">{departmentName}</span>
                          <ChevronRight
                            className={`h-3 w-3 text-neutral transition-transform duration-200 ${
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
                              className="overflow-hidden bg-white/30"
                            >
                              {departmentCategories.map(({ departmentCategoryName, productCategories, id }) => (
                                <div key={id}>
                                  <button
                                    onClick={() => toggleCategory(id)}
                                    className="w-full flex items-center justify-between p-2 pl-10 text-left hover:bg-white/50 transition-colors"
                                  >
                                    <span className="text-xs text-text-muted">{departmentCategoryName}</span>
                                    <ChevronRight
                                      className={`h-3 w-3 text-neutral transition-transform duration-200 ${
                                        openCategory === id ? "rotate-90" : ""
                                      }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {openCategory === id && (
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{
                                          duration: 0.2,
                                        }}
                                        className="overflow-hidden bg-white/50"
                                      >
                                        {productCategories.map(({ id, productCategoryName }) => (
                                          <Link
                                            key={id}
                                            href={`/market/category/${id}`}
                                            onClick={closeMobileMenu}
                                            className="block p-2 pl-14 text-xs text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
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
              className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-text-primary">Tiendas</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral transition-transform duration-200 ${
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
              className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Wrench className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-text-primary">Servicios</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral transition-transform duration-200 ${
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
              className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-text-primary">Comunidad</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral transition-transform duration-200 ${
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
                  className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                >
                  <Link
                    href="/community/forums"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Foros</h4>
                    <p className="text-xs text-text-muted">Discute temas ambientales</p>
                  </Link>
                  <Link
                    href="/community/events"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Eventos</h4>
                    <p className="text-xs text-text-muted">Actividades ecológicas</p>
                  </Link>
                  <Link
                    href="/community/groups"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Grupos</h4>
                    <p className="text-xs text-text-muted">Únete a comunidades</p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>

          {/* Blog Accordion */}
          <AccordionWrapper>
            <button
              onClick={() => toggleAccordion("blog")}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-light/50 transition-colors rounded-lg"
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium text-text-primary">Blog</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral transition-transform duration-200 ${
                  openAccordion === "blog" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openAccordion === "blog" && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-neutral-light/20 rounded-lg mt-1"
                >
                  <Link
                    href="/blog/sustainability"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Sostenibilidad</h4>
                    <p className="text-xs text-text-muted">Guías y consejos</p>
                  </Link>
                  <Link
                    href="/blog/reviews"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 border-b border-neutral/5 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Reviews</h4>
                    <p className="text-xs text-text-muted">Análisis de productos</p>
                  </Link>
                  <Link
                    href="/blog/news"
                    onClick={closeMobileMenu}
                    className="block p-3 pl-6 hover:bg-white/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-text-secondary mb-1">Noticias</h4>
                    <p className="text-xs text-text-muted">Actualidad ambiental</p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionWrapper>
        </section>

        {/* Quick Actions */}
        <section className="p-4 border-t border-neutral/10">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">Acciones Rápidas</h3>
          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={closeMobileMenu}
              className="flex items-center justify-between px-3 py-3 text-text-primary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg border border-neutral/20"
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
              className="flex items-center px-3 py-3 text-text-primary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg border border-neutral/20"
            >
              <Heart className="h-5 w-5 mr-3 text-primary" />
              <span>Lista de favoritos</span>
            </Link>
          </div>
        </section>

        {/* Settings & Support */}
        <section className="p-4 border-t border-neutral/10">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">Soporte</h3>
          <div className="space-y-1">
            <Link
              href="/help"
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg"
            >
              Centro de Ayuda
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors rounded-lg"
            >
              Contacto
            </Link>
          </div>
        </section>

        {/* Sign In/Out */}
        <div className="p-4 border-t border-neutral/10">
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
