import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, House, Package, Store, Users, Wrench } from "lucide-react";
import { Title } from "../text/title";
import { NavigationButton } from "./components/navigationButton";
import { AccordionWrapper } from "./components/accordion";
import { NavigationItem, NavigationListItemWrapper } from "./components/navigationItem";
import { useCatalogStore } from "@/store/catalog";
import { CategoryButton } from "./components/categoryButton";
import { CategoryWrapper } from "./components/categoryWrapper";
import useRedirect from "@/hooks/useRedirect";

type Props = {
  closeMobileMenu: () => void;
};

export default function SidebarNavigation({ closeMobileMenu }: Props) {
  const { redirectTo } = useRedirect();
  const { marketData, blogData } = useCatalogStore();

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDepartment, setOpenDepartment] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
    // Reset nested accordions when switching main sections
    if (openAccordion !== section) {
      setOpenDepartment(null);
      setOpenCategory(null);
    }
  };

  const toggleDepartment = (departmentId: number) => {
    setOpenDepartment(openDepartment === departmentId ? null : departmentId);
    setOpenCategory(null); // Reset category when switching departments
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="p-4 space-y-1">
      <Title variant="h6" className="font-semibold uppercase tracking-wide mb-3">
        Navegación
      </Title>

      {/* Home Link */}
      <AccordionWrapper>
        <NavigationButton icon={House} label="Inicio" redirect={() => redirectTo("/")} />
      </AccordionWrapper>

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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <NavigationListItemWrapper>
                {Array.isArray(marketData?.marketCatalog) &&
                  marketData?.marketCatalog.map(({ id, departmentName, departmentCategories }, index) => (
                    <CategoryWrapper key={id} index={index}>
                      <CategoryButton
                        onClick={() => toggleDepartment(id)}
                        name={departmentName}
                        id={id}
                        section={openDepartment}
                      />

                      <AnimatePresence>
                        {openDepartment === id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-neutral-100 dark:border-neutral-700">
                              {departmentCategories.map(
                                ({ departmentCategoryName, productCategories, id }, catIndex) => (
                                  <CategoryWrapper key={id} index={catIndex}>
                                    <CategoryButton
                                      onClick={() => toggleCategory(id)}
                                      name={departmentCategoryName}
                                      id={id}
                                      section={openCategory}
                                    />

                                    <AnimatePresence>
                                      {openCategory === id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2, ease: "easeInOut" }}
                                          className="overflow-hidden"
                                        >
                                          <NavigationListItemWrapper>
                                            {productCategories.map(({ id, productCategoryName }) => (
                                              <NavigationItem
                                                key={id}
                                                href={`/market/category/${id}`}
                                                closeMobileMenu={closeMobileMenu}
                                                title={productCategoryName}
                                              />
                                            ))}
                                          </NavigationListItemWrapper>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </CategoryWrapper>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CategoryWrapper>
                  ))}
              </NavigationListItemWrapper>
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-card-light-200 to-card-light-100 dark:from-card-dark-700 dark:to-card-dark-600 rounded-lg mt-2 border border-neutral-200 dark:border-neutral-600 shadow-sm p-4">
                <p className="text-sm text-text-500 dark:text-text-400 text-center italic">
                  Próximamente: Categorías de tiendas
                </p>
              </div>
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-card-light-200 to-card-light-100 dark:from-card-dark-700 dark:to-card-dark-600 rounded-lg mt-2 border border-neutral-200 dark:border-neutral-600 shadow-sm p-4">
                <p className="text-sm text-text-500 dark:text-text-400 text-center italic">
                  Próximamente: Categorías de servicios
                </p>
              </div>
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <NavigationListItemWrapper>
                <NavigationItem
                  title="Foros"
                  text="Discute temas ambientales"
                  href="/community/forums"
                  closeMobileMenu={closeMobileMenu}
                />
                <NavigationItem
                  title="Eventos"
                  text="Actividades ecológicas"
                  href="/community/events"
                  closeMobileMenu={closeMobileMenu}
                />
                <NavigationItem
                  title="Grupos"
                  text="Únete a comunidades"
                  href="/community/groups"
                  closeMobileMenu={closeMobileMenu}
                />
              </NavigationListItemWrapper>
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
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <NavigationListItemWrapper>
                {Array.isArray(blogData?.blogCategories) &&
                  blogData?.blogCategories.map(({ id, name }) => (
                    <NavigationItem
                      key={id}
                      title={name}
                      href={`/blog/category/${id}`}
                      closeMobileMenu={closeMobileMenu}
                    />
                  ))}
              </NavigationListItemWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </AccordionWrapper>
    </section>
  );
}
