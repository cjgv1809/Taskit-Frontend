import { Outlet } from "react-router-dom";
import { ClerkProvider, SignedOut } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <Header />
      </SignedOut>
      <Outlet /> {/* This will render the nested routes */}
      <SignedOut>
        <Footer />
      </SignedOut>
    </ClerkProvider>
  );
}
