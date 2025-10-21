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
          displayName
          description
          logo
          coverImage
          businessType
          legalBusinessName
          taxId
          businessActivity
          businessStartDate
          legalRepresentative
          legalRepresentativeTaxId
          formalizationStatus
          formalizationDeadline
          formalizationNotes
          minOrderAmount
          shippingPolicy
          returnPolicy
          serviceArea
          yearsOfExperience
          licenseNumber
          insuranceInfo
          certifications
          emergencyService
          travelRadius
          businessHours
          taxDocuments
          verificationDocuments
          createdAt
          updatedAt
        }
      }
      preferences {
        id
        sellerId
        preferredLanguage
        currency
        emailNotifications
        pushNotifications
        orderUpdates
        communityUpdates
        securityAlerts
        weeklySummary
        twoFactorAuth
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
`;
