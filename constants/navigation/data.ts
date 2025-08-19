export const navigationLinks = [
  { title: "Inicio", href: "/" },
  { title: "Mercado", href: "/departments" },
  { title: "Tiendas", href: "/stores" },
  { title: "Carrito", href: "/cart" },
  { title: "Perfil", href: "/profile" },
];

export const subnavigationLinks = [
  {
    title: "Mercado",
    href: "/departments",
    enabled: process.env.NEXT_PUBLIC_ENABLE_MARKET === "true",
  },
  {
    title: "Tiendas",
    href: "/stores",
    enabled: process.env.NEXT_PUBLIC_ENABLE_STORES === "true",
  },
  {
    title: "Servicios",
    href: "/services",
    enabled: process.env.NEXT_PUBLIC_ENABLE_SERVICES === "true",
  },
  {
    title: "Comunidad",
    href: "/community",
    enabled: process.env.NEXT_PUBLIC_ENABLE_COMMUNITY === "true",
  },
  {
    title: "Blog",
    href: "/blog",
    enabled: process.env.NEXT_PUBLIC_ENABLE_BLOG === "true",
  },
];

// Marketplace navigation structure
export const marketplaceDepartments = [
  {
    id: "eco-home",
    title: "Hogar Ecológico",
    href: "/departments/eco-home",
    categories: [
      {
        id: "cleaning",
        title: "Limpieza Natural",
        href: "/departments/eco-home/categories/cleaning",
        subcategories: [
          {
            id: "detergents",
            title: "Detergentes Ecológicos",
            href: "/departments/eco-home/categories/cleaning/subcategories/detergents",
          },
          {
            id: "soaps",
            title: "Jabones Naturales",
            href: "/departments/eco-home/categories/cleaning/subcategories/soaps",
          },
          {
            id: "disinfectants",
            title: "Desinfectantes Naturales",
            href: "/departments/eco-home/categories/cleaning/subcategories/disinfectants",
          },
        ],
      },
      {
        id: "kitchenware",
        title: "Utensilios de Cocina",
        href: "/departments/eco-home/categories/kitchenware",
        subcategories: [
          {
            id: "bamboo",
            title: "Bambú",
            href: "/departments/eco-home/categories/kitchenware/subcategories/bamboo",
          },
          {
            id: "glass",
            title: "Vidrio Reciclado",
            href: "/departments/eco-home/categories/kitchenware/subcategories/glass",
          },
          {
            id: "stainless",
            title: "Acero Inoxidable",
            href: "/departments/eco-home/categories/kitchenware/subcategories/stainless",
          },
        ],
      },
      {
        id: "textiles",
        title: "Textiles Orgánicos",
        href: "/departments/eco-home/categories/textiles",
        subcategories: [
          {
            id: "bedding",
            title: "Ropa de Cama",
            href: "/departments/eco-home/categories/textiles/subcategories/bedding",
          },
          {
            id: "towels",
            title: "Toallas Orgánicas",
            href: "/departments/eco-home/categories/textiles/subcategories/towels",
          },
          {
            id: "curtains",
            title: "Cortinas Naturales",
            href: "/departments/eco-home/categories/textiles/subcategories/curtains",
          },
        ],
      },
    ],
  },
  {
    id: "personal-care",
    title: "Cuidado Personal",
    href: "/departments/personal-care",
    categories: [
      {
        id: "skincare",
        title: "Cuidado de la Piel",
        href: "/departments/personal-care/categories/skincare",
        subcategories: [
          {
            id: "moisturizers",
            title: "Humectantes",
            href: "/departments/personal-care/categories/skincare/subcategories/moisturizers",
          },
          {
            id: "cleansers",
            title: "Limpiadores",
            href: "/departments/personal-care/categories/skincare/subcategories/cleansers",
          },
          {
            id: "serums",
            title: "Sueros",
            href: "/departments/personal-care/categories/skincare/subcategories/serums",
          },
        ],
      },
      {
        id: "haircare",
        title: "Cuidado del Cabello",
        href: "/departments/personal-care/categories/haircare",
        subcategories: [
          {
            id: "shampoos",
            title: "Champús Naturales",
            href: "/departments/personal-care/categories/haircare/subcategories/shampoos",
          },
          {
            id: "conditioners",
            title: "Acondicionadores",
            href: "/departments/personal-care/categories/haircare/subcategories/conditioners",
          },
          {
            id: "treatments",
            title: "Tratamientos",
            href: "/departments/personal-care/categories/haircare/subcategories/treatments",
          },
        ],
      },
    ],
  },
  {
    id: "fashion",
    title: "Moda Sostenible",
    href: "/departments/fashion",
    categories: [
      {
        id: "womens",
        title: "Mujer",
        href: "/departments/fashion/categories/womens",
        subcategories: [
          {
            id: "dresses",
            title: "Vestidos",
            href: "/departments/fashion/categories/womens/subcategories/dresses",
          },
          {
            id: "tops",
            title: "Blusas y Camisetas",
            href: "/departments/fashion/categories/womens/subcategories/tops",
          },
          {
            id: "bottoms",
            title: "Pantalones y Faldas",
            href: "/departments/fashion/categories/womens/subcategories/bottoms",
          },
        ],
      },
      {
        id: "mens",
        title: "Hombre",
        href: "/departments/fashion/categories/mens",
        subcategories: [
          {
            id: "shirts",
            title: "Camisas",
            href: "/departments/fashion/categories/mens/subcategories/shirts",
          },
          {
            id: "tshirts",
            title: "Camisetas",
            href: "/departments/fashion/categories/mens/subcategories/tshirts",
          },
          {
            id: "pants",
            title: "Pantalones",
            href: "/departments/fashion/categories/mens/subcategories/pants",
          },
        ],
      },
    ],
  },
  {
    id: "food",
    title: "Alimentos Orgánicos",
    href: "/departments/food",
    categories: [
      {
        id: "fresh",
        title: "Productos Frescos",
        href: "/departments/food/categories/fresh",
        subcategories: [
          {
            id: "fruits",
            title: "Frutas Orgánicas",
            href: "/departments/food/categories/fresh/subcategories/fruits",
          },
          {
            id: "vegetables",
            title: "Verduras Orgánicas",
            href: "/departments/food/categories/fresh/subcategories/vegetables",
          },
          {
            id: "herbs",
            title: "Hierbas Frescas",
            href: "/departments/food/categories/fresh/subcategories/herbs",
          },
        ],
      },
      {
        id: "pantry",
        title: "Despensa",
        href: "/departments/food/categories/pantry",
        subcategories: [
          {
            id: "grains",
            title: "Granos y Cereales",
            href: "/departments/food/categories/pantry/subcategories/grains",
          },
          {
            id: "legumes",
            title: "Legumbres",
            href: "/departments/food/categories/pantry/subcategories/legumes",
          },
          {
            id: "spices",
            title: "Especias Orgánicas",
            href: "/departments/food/categories/pantry/subcategories/spices",
          },
        ],
      },
    ],
  },
];

// Store categories
export const storeCategories = [
  {
    id: "verified",
    title: "Tiendas Verificadas",
    description: "Comercios con certificación ecológica",
  },
  {
    id: "local",
    title: "Comercio Local",
    description: "Apoya a los productores de tu región",
  },
  {
    id: "artisan",
    title: "Artesanos",
    description: "Productos hechos a mano únicos",
  },
  {
    id: "cooperatives",
    title: "Cooperativas",
    description: "Comercio justo y sostenible",
  },
];

// Service categories
export const serviceCategories = [
  {
    id: "consulting",
    title: "Consultoría Ambiental",
    description: "Asesoría para empresas sostenibles",
  },
  {
    id: "installation",
    title: "Instalación de Energías Renovables",
    description: "Paneles solares, eólica",
  },
  {
    id: "recycling",
    title: "Servicios de Reciclaje",
    description: "Gestión de residuos responsable",
  },
  {
    id: "education",
    title: "Educación Ambiental",
    description: "Talleres y cursos de sostenibilidad",
  },
];
