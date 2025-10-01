import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query Blogs {
    blogs(take: 10, skip: 0, orderBy: { field: "title", direction: asc }) {
      id
      title
      content
      excerpt
      slug
      category
      status
      featuredImage
      images
      tags
      metaTitle
      metaDescription
      readingTime
      views
      publishedAt
      createdAt
      updatedAt
      likesCount
      commentsCount
      likes {
        id
      }
      comments {
        id
        comment
        userId
        createdAt
        user {
          id
          email
          sellerType
          isActive
          isVerified
          createdAt
          updatedAt
          profile {
            ... on ServiceProfile {
              id
              sellerId
              businessName
              displayName
              logo
            }
            ... on StoreProfile {
              id
              sellerId
              businessName
              displayName
              logo
            }
            ... on PersonProfile {
              id
              sellerId
              firstName
              lastName
              displayName
              profileImage
            }
          }
        }
      }
      admin {
        id
        email
        name
        lastName
      }
    }
  }
`;

export const GET_BLOG_CATEGORIES = gql`
  query BlogCategories {
    blogCategories {
      id
      name
      icon
      description
      blogs {
        id
        title
      }
    }
  }
`;
