import { useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { AuthContext } from "@/context";

export function useAuth() {
  const context = useContext(AuthContext);
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalUser, setInternalUser] = useState<User | null>(null);

  useEffect(() => {
    if (context && !context.loading) {
      setInternalUser(context.currentUser as User | null);
      setInternalLoading(false);
    }
  }, [context]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { currentUser: internalUser, loading: internalLoading };
}
