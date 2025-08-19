import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($id: ID) {
    user(id: $id) {
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

export const GET_USER_CATEGORIES = gql`
  query UserCategories {
    userCategories {
      id
      name
      categoryDiscountAmount
      pointsThreshold
      level
    }
  }
`;

export const GET_USER_CATEGORY = gql`
  query UserCategory($id: ID) {
    userCategory(id: $id) {
      id
      name
      categoryDiscountAmount
      pointsThreshold
      level
    }
  }
`;
