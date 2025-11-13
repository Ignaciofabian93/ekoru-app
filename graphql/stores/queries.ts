import { gql } from "@apollo/client";

export const GET_STORE_CATEGORY = gql`
  query GetStoreCategory($id: ID!) {
    getStoreCategory(id: $id) {
      id
      category
      href
      subcategories {
        id
        subCategory
        productCount
        href
        storeCategory {
          id
          category
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
          stock
          barcode
          sku
          price
          hasOffer
          offerPrice
          sellerId
          images
          createdAt
          updatedAt
          isActive
          badges
          brand
          color
          ratingCount
          ratings
          reviewsNumber
          materialComposition
          recycledContent
          subcategoryId
          sustainabilityScore
          carbonFootprint
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
          productVariants {
            id
            storeProductId
            name
            price
            stock
            color
            size
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;
