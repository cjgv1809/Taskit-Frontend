import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// Custom Hook to verify signed-in users
export function useVerifySignedInUser() {
  const { currentUser, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false

  useEffect(() => {
    if (!loading) {
      const authStatus = !!currentUser;
      setIsAuthenticated(authStatus); // Set isAuthenticated to true if currentUser is not null
    }
  }, [loading, currentUser]);

  return { isAuthenticated, loading };
}
