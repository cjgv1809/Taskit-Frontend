import React, { createContext, useState, useEffect } from "react";
import { UserContextType } from "@/types";

export const UserContext = createContext<UserContextType>({
  userId: 1,
  setUserId: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? parseInt(storedUserId, 10) : 1;
  });

  useEffect(() => {
    try {
      localStorage.setItem("userId", userId.toString());
    } catch (error) {
      console.error("Error persisting userId to localStorage:", error);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
