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
