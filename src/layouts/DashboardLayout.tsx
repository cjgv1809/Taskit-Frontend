import { Navigate, Outlet } from "react-router-dom";
import { useVerifySignedInUser } from "@/hooks/useVerifySignedInUser";
import Loading from "@/components/Loading";

function DashboardLayout() {
  const { isAuthenticated, loading } = useVerifySignedInUser();

  if (loading) {
    return <Loading />; // Display loading while the auth status is being determined
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default DashboardLayout;
