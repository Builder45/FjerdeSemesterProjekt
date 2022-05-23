import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Hvis der opstår fejl i token refresh, skal brugeren logges af:
    if (session?.error === "ErrorRefreshingAccessToken") {
      router.push('/auth/session-udloebet');
        return { isAuthenticated: false, authStatus: status };
    }
    if (session === null) {
      setIsAuthenticated(false);
    }
    else if (session !== undefined) {
      setIsAuthenticated(true);
    }
  }, [session]);

  return { isAuthenticated, authStatus: status };
}