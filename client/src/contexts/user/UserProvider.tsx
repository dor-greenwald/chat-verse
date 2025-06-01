//userProvider
import React, { createContext, useContext, useState, useEffect } from "react";
import { type User } from "../../interfaces/interfaces";
import { fakeUserData } from "../../fake-data/fakeData";

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
    // Fetch user data from API or local storage
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      const userData = storedUser ? JSON.parse(storedUser) : fakeUserData; //TODO: replace with actual api call
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    };

    fetchUser();
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
