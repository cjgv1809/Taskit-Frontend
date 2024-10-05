import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout() {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      {!currentUser && <Header />}
      <Outlet /> {/* This will render the nested routes */}
      {!currentUser && <Footer />}
    </AuthProvider>
  );
}
