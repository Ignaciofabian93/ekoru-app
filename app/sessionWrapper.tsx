/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RefreshToken } from "./api/auth/auth";
import { Loader2 } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/session/queries";
import useSessionStore from "@/store/session";

export default function SessionWrapper({
  children,
  token,
  refreshToken,
}: {
  children: React.ReactNode;
  token: string | undefined;
  refreshToken: string | undefined;
}) {
  const [userFetched, setUserFetched] = useState<boolean>(false);
  const pathname = usePathname();
  const { handleSession, setIsLoading, data, clearSession, _hasHydrated } = useSessionStore();

  const [GetMe, { loading: userLoading }] = useLazyQuery(GET_ME);

  useEffect(() => {
    // Wait for hydration before doing anything
    if (!_hasHydrated) return;

    const initSession = async () => {
      // If both tokens are missing, clear session and mark as not loading
      if (!token && !refreshToken) {
        clearSession();
        setIsLoading(false);
        return;
      }

      // If we already have user data in the store and have a token, we're good
      if (token && data.id && !userFetched) {
        setUserFetched(true);
        setIsLoading(false);
        return;
      }

      // If token is missing but refreshToken exists, try to refresh
      if (!token && refreshToken) {
        setIsLoading(true);
        try {
          const refreshResponse = await RefreshToken();
          if (refreshResponse?.success) {
            window.location.href = pathname; // Reload the page to apply the new token
            return;
          }
        } catch (error) {
          console.error("Error al intentar renovar el token:", error);
        }
        clearSession();
        setIsLoading(false);
        return;
      }

      // If token exists, fetch user data (only once)
      if (token && !userFetched) {
        setUserFetched(true);
        setIsLoading(true);
        try {
          const { data: userData, error } = await GetMe();
          if (userData) {
            handleSession(userData.me);
            setIsLoading(false);
            return;
          }
          // If 401, try refresh
          if (
            error &&
            error.networkError &&
            "statusCode" in error.networkError &&
            error.networkError.statusCode === 401
          ) {
            const refreshResponse = await RefreshToken();
            if (refreshResponse?.success) {
              const { data: refreshedData } = await GetMe();
              if (refreshedData) {
                handleSession(refreshedData.me);
              }
              setIsLoading(false);
              return;
            }
          }
          // If still not authenticated, clear session
          clearSession();
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          clearSession();
          setIsLoading(false);
        }
        return;
      }
    };

    initSession();
  }, [token, refreshToken, userFetched, pathname, _hasHydrated]);

  // Show loading while hydrating or fetching user
  if (!_hasHydrated || userLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  // Optionally pass guest state to children via context or props
  return <>{children}</>;
}
