import { gql } from "@apollo/client";

export const GET_STORE_CATALOG = gql`
  query StoreCatalog {
    storeCatalog {
      id
      category
      subcategories {
        id
        subCategory
      }
    }
  }
`;

export const GET_MARKET_CATALOG = gql`
  query MarketCatalog {
    marketCatalog {
      id
      departmentName
      departmentCategory {
        id
        departmentCategoryName
        productCategory {
          id
          departmentCategoryId
          keywords
          productCategoryName
          size
          averageWeight
          weightUnit
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
      subcategories {
        id
        subCategory
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
    }
  }
`;

export const GET_COMMUNITY_CATALOG = gql`
  query CommunityCatalog {
    communityCatalog {
      id
      category
      subcategories {
        id
        subCategory
      }
    }
  }
`;
