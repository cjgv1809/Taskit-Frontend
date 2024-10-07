import React, { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase";
import { AuthContextType } from "@/types";

// Create AuthContext with the appropriate type
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider to wrap around your application
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase observer to listen for changes to the user's sign-in state
    const unsubscribe = auth.onAuthStateChanged(
      (user: User | null) => {
        setCurrentUser(user); // Set the current user
        setLoading(false); // After the check is complete, stop loading
      },
      (error) => {
        console.error("Error during authentication state change:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
