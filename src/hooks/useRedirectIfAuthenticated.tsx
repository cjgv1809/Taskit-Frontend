import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const useRedirectIfAuthenticated = (redirectPath = "/dashboard") => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate(redirectPath); // Redirect if user is authenticated
    }
  }, [isLoaded, userId, navigate, redirectPath]);

  // Return loading state, so components can display a loading UI if needed
  return !isLoaded;
};
