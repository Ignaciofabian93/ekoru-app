import { ENVIRONMENT } from "./environment";

export const GRAPHQL_URL =
  ENVIRONMENT === "production"
    ? "https://qa.gateway.ekoru.cl/graphql"
    : "http://localhost:9000/graphql";

export const REST_URL =
  ENVIRONMENT === "production"
    ? "https://qa.gateway.ekoru.cl/session"
    : "http://localhost:9000/session";
