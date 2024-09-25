import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in"); // Redirect if user is not authenticated
    }
  }, [isLoaded, userId, navigate]); // Added userId to dependencies

  if (!isLoaded) return <div>Loading...</div>; // Improve loading UI

  return <Outlet />; // Render child routes
}
