import { gql } from "@apollo/client";

export const REGISTER_PERSON = gql`
  mutation RegisterPerson($input: RegisterPersonInput!) {
    registerPerson(input: $input) {
      id
      email
      sellerType
    }
  }
`;

export const REGISTER_BUSINESS = gql`
  mutation RegisterBusiness($input: RegisterBusinessInput!) {
    registerBusiness(input: $input) {
      id
      email
      sellerType
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
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
`;

export const UPDATE_BUSINESS_PROFILE = gql`
  mutation UpdateBusinessProfile($input: UpdateBusinessProfileInput!) {
    updateBusinessProfile(input: $input) {
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
`;
