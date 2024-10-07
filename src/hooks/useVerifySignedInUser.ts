import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useVerifySignedInUser() {
  const { currentUser, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Auth state changed:", { loading, currentUser });
      if (!loading) {
        const authStatus = !!currentUser;
        setIsAuthenticated(authStatus);
        setInternalLoading(false);
        console.log("Is authenticated:", authStatus);
      }
    };

    checkAuth();
  }, [loading, currentUser]);

  return { isAuthenticated, loading: internalLoading };
}
