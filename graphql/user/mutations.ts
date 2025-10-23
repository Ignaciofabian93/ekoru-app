import { gql } from "@apollo/client";

export const UPDATE_SELLER = gql`
  mutation UpdateSeller($input: UpdateSellerInput!) {
    updateSeller(input: $input) {
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
