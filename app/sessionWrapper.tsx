import { useEffect, useState } from "react";
// import { useLazyQuery } from "@apollo/client";
import {
  usePathname,
  // useRouter
} from "next/navigation";
// import useAlert from "@/hooks/useAlert";
import { RefreshToken } from "./api/auth/auth";
import { Loader2 } from "lucide-react";
// import { GET_PROFILE } from "@/graphql/session/queries"; // Uncomment and adjust if needed
// import useSessionStore from "@/store/session"; // Uncomment and adjust if needed

export default function SessionWrapper({
  children,
  token,
  refreshToken,
}: {
  children: React.ReactNode;
  token: string | undefined;
  refreshToken: string | undefined;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  // const [isGuest, setIsGuest] = useState<boolean>(false);
  const [userFetched, setUserFetched] = useState<boolean>(false);
  // const router = useRouter();
  const pathname = usePathname();
  // const { notifyError } = useAlert();
  // const { handleSession, data } = useSessionStore();
  // const [GetMe, { error: authError, loading: authLoading }] = useLazyQuery(GET_PROFILE);

  useEffect(() => {
    // If both tokens are missing, assume guest user
    if (!token && !refreshToken) {
      // setIsGuest(true);
      setLoading(false);
      return;
    }

    // If token is missing but refreshToken exists, try to refresh
    if (!token && refreshToken) {
      (async () => {
        try {
          const refreshResponse = await RefreshToken();
          if (refreshResponse?.success) {
            window.location.href = pathname; // Reload the page to apply the new token
            return;
          }
        } catch (error) {
          console.error("Error al intentar renovar el token:", error);
        }
        setLoading(false);
      })();
      return;
    }

    // If token exists, fetch user data (only once)
    if (token && !userFetched) {
      setUserFetched(true);
      // Uncomment and adjust below to fetch user data
      // (async () => {
      //   try {
      //     const { data: userData, error } = await GetMe();
      //     if (userData) {
      //       handleSession(userData.me);
      //       setLoading(false);
      //       return;
      //     }
      //     // If 401, try refresh
      //     if (
      //       error &&
      //       error.networkError &&
      //       "statusCode" in error.networkError &&
      //       error.networkError.statusCode === 401
      //     ) {
      //       const refreshResponse = await RefreshToken();
      //       if (refreshResponse?.success) {
      //         const { data: refreshedData } = await GetMe();
      //         handleSession(refreshedData.me);
      //         setLoading(false);
      //         return;
      //       }
      //     }
      //     // If still not authenticated, assume guest
      //     setIsGuest(true);
      //     setLoading(false);
      //   } catch (error) {
      //     console.error(error, authError);
      //     setIsGuest(true);
      //     setLoading(false);
      //   }
      // })();
      // For now, just simulate fetch
      setTimeout(() => setLoading(false), 500);
      return;
    }
    // If token exists and user already fetched
    if (token && userFetched) {
      setLoading(false);
      return;
    }
  }, [token, refreshToken, userFetched, pathname]);

  // Optionally show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  // Optionally pass guest state to children via context or props
  return <>{children}</>;
}
