import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
