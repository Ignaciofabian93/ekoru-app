import { gql } from "@apollo/client";

export const GET_STORE_CATALOG = gql`
  query StoreCatalog {
    storeCatalog {
      id
      category
      href
      subcategories {
        id
        subCategory
        href
      }
    }
  }
`;

export const GET_MARKET_CATALOG = gql`
  query MarketCatalog {
    marketCatalog {
      id
      departmentName
      href
      departmentCategory {
        id
        departmentCategoryName
        href
        productCategory {
          id
          departmentCategoryId
          keywords
          productCategoryName
          size
          averageWeight
          weightUnit
          href
        }
      }
    }
  }
`;

export const GET_SERVICES_CATALOG = gql`
  query ServiceCatalog {
    serviceCatalog {
      id
      category
      href
      subcategories {
        id
        subCategory
        href
      }
    }
  }
`;

export const GET_BLOG_CATALOG = gql`
  query BlogCatalog {
    blogCatalog {
      id
      name
      icon
      description
      href
    }
  }
`;

export const GET_COMMUNITY_CATALOG = gql`
  query CommunityCatalog {
    communityCatalog {
      id
      category
      href
      subcategories {
        id
        subCategory
        href
      }
    }
  }
`;
