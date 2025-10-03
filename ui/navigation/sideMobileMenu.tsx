import { Department } from "@/types/product";
import { motion, AnimatePresence } from "motion/react";
import { Seller } from "@/types/user";
import { Title } from "../text/title";
import { BlogCategories } from "@/types/blog";
import { BookOpen, ChevronRight, House, LogOut, Package, Store, Users, Wrench } from "lucide-react";
import Link from "next/link";
import MainButton from "../buttons/mainButton";
import useLogout from "@/hooks/useLogout";
import useRedirect from "@/hooks/useRedirect";
import { SideBarHeader } from "./components/sidebarHeader";
import { NavigationButton } from "./components/navigationButton";
import { AccordionListItem, AccordionListWrapper, AccordionWrapper } from "./components/accordion";
import { SideBarProfile } from "./components/sidebarProfile";
import QuickActions from "./components/quickActions";
import Support from "./components/support";

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

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="relative w-[70%] max-w-sm h-full bg-container-light-50 dark:bg-container-dark-900 shadow-2xl"
    >
      {/* Menu Header */}
      <SideBarHeader closeMobileMenu={closeMobileMenu} />

      {/* Scrollable Menu Content */}
      <aside className="h-full overflow-y-auto pb-20 scrollbar-hide">
        {/* User Section */}
        <SideBarProfile data={data} closeMobileMenu={closeMobileMenu} />

        {/* Navigation Links with Accordion */}
        <section className="p-4 space-y-1">
          <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
            Navegación
          </Title>

          {/* Home Link */}
          <NavigationButton icon={House} label="Inicio" redirect={() => redirectTo("/")} />

          {/* Mercado Accordion */}
          <AccordionWrapper>
            <NavigationButton
              openAccordion={openAccordion ?? null}
              toggleAccordion={toggleAccordion}
              icon={Package}
              label="Mercado"
              section="mercado"
            />

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
            <NavigationButton
              openAccordion={openAccordion ?? null}
              toggleAccordion={toggleAccordion}
              icon={Store}
              label="Tiendas"
              section="tiendas"
            />

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
            <NavigationButton
              openAccordion={openAccordion ?? null}
              toggleAccordion={toggleAccordion}
              icon={Wrench}
              label="Servicios"
              section="servicios"
            />

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
            <NavigationButton
              openAccordion={openAccordion ?? null}
              toggleAccordion={toggleAccordion}
              icon={Users}
              label="Comunidad"
              section="comunidad"
            />

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
              section="blog"
            />
            <AnimatePresence>
              {openAccordion === "blog" && (
                <AccordionListWrapper>
                  {Array.isArray(blogData?.blogCategories) &&
                    blogData?.blogCategories.map(({ id, name }) => (
                      <AccordionListItem
                        key={id}
                        href={`/blog/category/${id}`}
                        name={name}
                        closeMobileMenu={closeMobileMenu}
                      />
                    ))}
                </AccordionListWrapper>
              )}
            </AnimatePresence>
          </AccordionWrapper>
        </section>

        {/* Quick Actions */}
        <QuickActions closeMobileMenu={closeMobileMenu} />

        {/* Support */}
        <Support closeMobileMenu={closeMobileMenu} />

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
