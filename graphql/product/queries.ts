import { gql } from "@apollo/client";

export const GET_DEPARTMENT_BY_ID = gql`
  query GetDepartment($id: ID!, $page: Int!, $pageSize: Int!) {
    getDepartment(id: $id, page: $page, pageSize: $pageSize) {
      id
      departmentName
      departmentImage
      href
      departmentCategory {
        id
        departmentId
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
      products {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          totalCount
          totalPages
          currentPage
          pageSize
        }
        nodes {
          id
          name
          description
          price
          hasOffer
          offerPrice
          sellerId
          badges
          brand
          color
          createdAt
          images
          interests
          isActive
          isExchangeable
          productCategoryId
          updatedAt
          condition
          conditionDescription
          environmentalImpact {
            totalCo2SavingsKG
            totalWaterSavingsLT
            materialBreakdown {
              materialType
              percentage
              weightKG
              co2SavingsKG
              waterSavingsLT
            }
          }
          seller {
            id
            email
            sellerType
            isActive
            isVerified
            createdAt
            updatedAt
            address
            phone
            website
            preferredContactMethod
            socialMediaLinks
            points
            profile {
              ... on PersonProfile {
                id
                sellerId
                firstName
                lastName
                displayName
                bio
                birthday
                profileImage
                coverImage
                allowExchanges
              }
              ... on BusinessProfile {
                id
                sellerId
                businessName
                description
                logo
                coverImage
                businessType
                legalBusinessName
                taxId
                businessStartDate
                legalRepresentative
                legalRepresentativeTaxId
                shippingPolicy
                returnPolicy
                serviceArea
                yearsOfExperience
                certifications
                travelRadius
                businessHours
                createdAt
                updatedAt
              }
            }
            sellerCategory {
              id
              name
              categoryDiscountAmount
              pointsThreshold
              level
            }
            country {
              id
              country
            }
            region {
              id
              region
            }
            city {
              id
              city
            }
            county {
              id
              county
            }
          }
        }
      }
    }
  }
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRODUCT FORM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      id
      departmentName
    }
  }
`;

export const GET_DEPARTMENT_CATEGORIES_BY_DEPARTMENT_ID = gql`
  query GetDepartmentCategoriesByDepartmentId($departmentId: ID!) {
    getDepartmentCategoriesByDepartmentId(departmentId: $departmentId) {
      id
      departmentCategoryName
    }
  }
`;

export const GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY_ID = gql`
  query GetProductCategoriesByDepartmentCategoryId($departmentCategoryId: ID!) {
    getProductCategoriesByDepartmentCategoryId(departmentCategoryId: $departmentCategoryId) {
      id
      productCategoryName
      size
      averageWeight
      weightUnit
      materials {
        id
        productCategoryId
        materialTypeId
        quantity
        unit
        isPrimary
        createdAt
        updatedAt
        material {
          id
          materialType
          estimatedCo2SavingsKG
          estimatedWaterSavingsLT
        }
      }
    }
  }
`;

export const GET_STORE_CATEGORIES = gql`
  query GetStoreCategories {
    getStoreCategories {
      id
      category
    }
  }
`;

export const GET_STORE_SUBCATEGORIES_BY_CATEGORY_ID = gql`
  query GetStoreSubCategoriesByCategoryId($storeCategoryId: ID!) {
    getStoreSubCategoriesByCategoryId(storeCategoryId: $storeCategoryId) {
      id
      subCategory
    }
  }
`;
