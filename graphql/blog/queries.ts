import { gql } from "@apollo/client";

export const GET_BLOGS_BY_CATEGORY = gql`
  query BlogsByCategory($category: BlogType!, $page: Int!, $pageSize: Int!) {
    blogsByCategory(category: $category, page: $page, pageSize: $pageSize) {
      nodes {
        id
        title
        content
        authorId
        isPublished
        publishedAt
        createdAt
        updatedAt
        likes
        dislikes
        author {
          id
          email
          name
          lastName
        }
      }
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
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query Blog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      isPublished
      publishedAt
      createdAt
      updatedAt
      likes
      dislikes
      type
      author {
        id
        email
        name
        lastName
        seller {
          id
          email
          sellerType
          socialMediaLinks
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
          isVerified
        }
        region {
          id
          region
        }
        county {
          id
          county
        }
        country {
          id
          country
        }
        city {
          id
          city
        }
      }
    }
  }
`;
