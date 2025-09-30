import { gql } from "@apollo/client";

export const GET_STORE_CATALOG = gql`
  query StoreCatalog {
    storeCatalog {
      id
      email
      sellerType
      isVerified
      createdAt
      updatedAt
      isActive
      storeProfile {
        id
        sellerId
        businessName
        displayName
        description
        businessType
        businessRegistration
        logo
      }
    }
  }
`;

export const GET_MARKET_CATALOG = gql`
  query MarketCatalog {
    marketCatalog {
      id
      departmentName
      departmentCategories {
        id
        departmentCategoryName
        productCategories {
          id
          productCategoryName
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
    }
  }
`;
