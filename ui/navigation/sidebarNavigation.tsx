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
  const { marketData, blogData, storeData, serviceData, communityData } = useCatalogStore();

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openDepartment, setOpenDepartment] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  // Additional states for stores and services
  const [openStoreCategory, setOpenStoreCategory] = useState<number | null>(null);
  const [openServiceCategory, setOpenServiceCategory] = useState<number | null>(null);
  const [openCommunityCategory, setOpenCommunityCategory] = useState<number | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
    // Reset nested accordions when switching main sections
    if (openAccordion !== section) {
      setOpenDepartment(null);
      setOpenCategory(null);
      setOpenStoreCategory(null);
      setOpenServiceCategory(null);
      setOpenCommunityCategory(null);
    }
  };

  const toggleDepartment = (departmentId: number) => {
    setOpenDepartment(openDepartment === departmentId ? null : departmentId);
    setOpenCategory(null); // Reset category when switching departments
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const toggleStoreCategory = (categoryId: number) => {
    setOpenStoreCategory(openStoreCategory === categoryId ? null : categoryId);
  };

  const toggleServiceCategory = (categoryId: number) => {
    setOpenServiceCategory(openServiceCategory === categoryId ? null : categoryId);
  };

  const toggleCommunityCategory = (categoryId: number) => {
    setOpenCommunityCategory(openCommunityCategory === categoryId ? null : categoryId);
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
                  marketData?.marketCatalog.map(({ id, departmentName, departmentCategory, href }, index) => (
                    <CategoryWrapper key={id} index={index}>
                      <CategoryButton
                        onClick={() => toggleDepartment(id)}
                        name={departmentName}
                        id={id}
                        section={openDepartment}
                        href={href}
                        closeMobileMenu={closeMobileMenu}
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
                              {departmentCategory.map(
                                ({ departmentCategoryName, productCategory, id, href }, catIndex) => (
                                  <CategoryWrapper key={id} index={catIndex}>
                                    <CategoryButton
                                      onClick={() => toggleCategory(id)}
                                      name={departmentCategoryName}
                                      id={id}
                                      section={openCategory}
                                      href={href}
                                      closeMobileMenu={closeMobileMenu}
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
                                            {productCategory.map(({ id, productCategoryName, href }) => (
                                              <NavigationItem
                                                key={id}
                                                href={href}
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
              <NavigationListItemWrapper>
                {Array.isArray(storeData?.storeCatalog) &&
                  storeData?.storeCatalog.map(({ id, category, subcategories, href }, index) => (
                    <CategoryWrapper key={id} index={index}>
                      <CategoryButton
                        onClick={() => toggleStoreCategory(id)}
                        name={category}
                        id={id}
                        section={openStoreCategory}
                        href={href}
                        closeMobileMenu={closeMobileMenu}
                      />

                      <AnimatePresence>
                        {openStoreCategory === id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <NavigationListItemWrapper>
                              {subcategories.map(({ id, subCategory, href }) => (
                                <NavigationItem
                                  key={id}
                                  href={href}
                                  closeMobileMenu={closeMobileMenu}
                                  title={subCategory}
                                />
                              ))}
                            </NavigationListItemWrapper>
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
              <NavigationListItemWrapper>
                {Array.isArray(serviceData?.serviceCatalog) &&
                  serviceData?.serviceCatalog.map(({ id, category, subcategories, href }, index) => (
                    <CategoryWrapper key={id} index={index}>
                      <CategoryButton
                        onClick={() => toggleServiceCategory(id)}
                        name={category}
                        id={id}
                        section={openServiceCategory}
                        href={href}
                        closeMobileMenu={closeMobileMenu}
                      />

                      <AnimatePresence>
                        {openServiceCategory === id && subcategories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <NavigationListItemWrapper>
                              {subcategories.map(({ id, subCategory, href }) => (
                                <NavigationItem
                                  key={id}
                                  href={href}
                                  closeMobileMenu={closeMobileMenu}
                                  title={subCategory}
                                />
                              ))}
                            </NavigationListItemWrapper>
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
                {Array.isArray(communityData?.communityCatalog) &&
                  communityData?.communityCatalog.map(({ id, category, subcategories, href }, index) => (
                    <CategoryWrapper key={id} index={index}>
                      <CategoryButton
                        onClick={() => toggleCommunityCategory(id)}
                        name={category}
                        id={id}
                        section={openCommunityCategory}
                        href={href}
                        closeMobileMenu={closeMobileMenu}
                      />

                      <AnimatePresence>
                        {openCommunityCategory === id && subcategories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <NavigationListItemWrapper>
                              {subcategories.map(({ id, subCategory, href }) => (
                                <NavigationItem
                                  key={id}
                                  href={href}
                                  closeMobileMenu={closeMobileMenu}
                                  title={subCategory}
                                />
                              ))}
                            </NavigationListItemWrapper>
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
                {Array.isArray(blogData?.blogCatalog) &&
                  blogData?.blogCatalog.map(({ id, name, href }) => (
                    <NavigationItem key={id} title={name} href={href} closeMobileMenu={closeMobileMenu} />
                  ))}
              </NavigationListItemWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </AccordionWrapper>
    </section>
  );
}
