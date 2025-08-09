"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@/lib/apolloSetup";
import { GRAPHQL_URL } from "@/config/endpoints";
import SessionWrapper from "./sessionWrapper";

export default function Providers({
  children,
  token,
  refreshToken,
}: {
  children: React.ReactNode;
  token: string | undefined;
  refreshToken: string | undefined;
}) {
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    devtools: { enabled: true },
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <SessionWrapper token={token} refreshToken={refreshToken}>
        {children}
      </SessionWrapper>
    </ApolloProvider>
  );
}
