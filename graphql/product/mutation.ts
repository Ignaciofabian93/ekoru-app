import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: AddProductInput!) {
    addProduct(input: $input) {
      id
    }
  }
`;

export const ADD_STORE_PRODUCT = gql`
  mutation AddStoreProduct($input: AddStoreProductInput!) {
    addStoreProduct(input: $input) {
      id
    }
  }
`;
