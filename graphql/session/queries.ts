import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
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
      accountType
      points
      storeProfile {
        id
        sellerId
        businessName
        displayName
        description
        logo
        coverImage
        businessType
        taxId
        businessRegistration
        allowExchanges
        minOrderAmount
        shippingPolicy
        returnPolicy
        businessHours
      }
      personProfile {
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
      userCategory {
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
`;
