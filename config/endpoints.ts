import { ENVIRONMENT } from "./environment";

const getEndpoints = () => {
  switch (ENVIRONMENT) {
    case "production":
      return {
        graphql: "https://gateway.ekoru.cl/graphql",
        rest: "https://gateway.ekoru.cl/session",
      };
    case "qa":
      return {
        graphql: "https://qa.gateway.ekoru.cl/graphql",
        rest: "https://qa.gateway.ekoru.cl/session",
      };
    default:
      return {
        graphql: "http://localhost:9000/graphql",
        rest: "http://localhost:9000/session",
      };
  }
};

const endpoints = getEndpoints();

console.log(`[ENDPOINTS] Environment: ${ENVIRONMENT}`);
console.log(`[ENDPOINTS] GraphQL URL: ${endpoints.graphql}`);
console.log(`[ENDPOINTS] REST URL: ${endpoints.rest}`);

export const GRAPHQL_URL = endpoints.graphql;
export const REST_URL = endpoints.rest;
