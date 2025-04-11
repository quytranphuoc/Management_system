import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "../Types"; // bạn đã setup rồi

interface UserContextProps {
  userData: IUser | null;
  fetchUserDetails: () => Promise<void>;
  error: string | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextProps>({
  userData: null,
  fetchUserDetails: async () => {},
  error: null,
  setUserData: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("Token Not Present");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/auth/get-userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        setError(response.data.message);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, fetchUserDetails, error, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
