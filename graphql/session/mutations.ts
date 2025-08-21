import { gql } from "@apollo/client";

export const REGISTER_PERSON = gql`
  mutation RegisterPerson($input: RegisterPersonInput!) {
    registerPerson(input: $input) {
      email
      firstName
      sellerType
      createdAt
      updatedAt
    }
  }
`;

export const REGISTER_STORE = gql`
  mutation RegisterStore($input: RegisterStoreInput!) {
    registerStore(input: $input) {
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
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
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
    }
  }
`;

export const UPDATE_PERSON_PROFILE = gql`
  mutation UpdatePersonProfile($input: UpdatePersonProfileInput!) {
    updatePersonProfile(input: $input) {
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
    }
  }
`;

export const UPDATE_STORE_PROFILE = gql`
  mutation UpdateStoreProfile($input: UpdateStoreProfileInput!) {
    updateStoreProfile(input: $input) {
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
    }
  }
`;
