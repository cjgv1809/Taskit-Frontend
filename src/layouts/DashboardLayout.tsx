import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";
import Loading from "@/components/Loading";

function DashboardLayout() {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/sign-in" />;
  }

  const { currentUser, loading } = auth;

  if (loading) {
    return <Loading />;
  }

  console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default DashboardLayout;
