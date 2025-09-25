"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@/lib/apolloSetup";
import { GRAPHQL_URL } from "@/config/endpoints";
import SessionWrapper from "./sessionWrapper";
import InitialDataProvider from "@/providers/initialData";
import { ThemeProvider } from "@/providers/theme";

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ApolloProvider client={client}>
        <SessionWrapper token={token} refreshToken={refreshToken}>
          <InitialDataProvider>{children}</InitialDataProvider>
        </SessionWrapper>
      </ApolloProvider>
    </ThemeProvider>
  );
}
