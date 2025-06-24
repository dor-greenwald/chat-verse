//userProvider
import React, { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../../interfaces/interfaces";

const UserContext = createContext<
  | {
      user: User | undefined;
      setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    }
  | undefined
>(undefined);

interface UserContextProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
