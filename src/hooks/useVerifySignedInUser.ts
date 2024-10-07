import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

// Custom Hook to verify signed-in users
export function useVerifySignedInUser() {
  const { currentUser, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize to false

  useEffect(() => {
    console.log("currentUser:", currentUser);
    console.log("loading:", loading);
    if (!loading) {
      const authStatus = !!currentUser;
      setIsAuthenticated(authStatus); // Set isAuthenticated to true if currentUser is not null
      console.log("isAuthenticated:", authStatus);
    }
  }, [loading, currentUser]);

  console.log("isAuthenticated in hook (outside useEffect):", isAuthenticated);

  return { isAuthenticated, loading };
}
