import { gql } from "@apollo/client";

export const GET_STORE_CATALOG = gql`
  query StoreCatalog {
    storeCatalog {
      id
      category
      subcategories {
        id
        subcategory
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

export const GET_BLOG_CATALOG = gql`
  query BlogCategories {
    blogCategories {
      id
      name
      icon
      description
    }
  }
`;
