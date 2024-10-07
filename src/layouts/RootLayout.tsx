import { Outlet, useLocation } from "react-router-dom";
import { useVerifySignedInUser } from "@/hooks/useVerifySignedInUser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default function RootLayout() {
  const { isAuthenticated, loading } = useVerifySignedInUser();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  if (loading) {
    return <Loading />; // Optionally, you can return a loading spinner here
  }

  return (
    <>
      {!isDashboard || !isAuthenticated ? <Header /> : null}
      <Outlet /> {/* This will render the nested routes */}
      {!isDashboard && <Footer />}
    </>
  );
}
