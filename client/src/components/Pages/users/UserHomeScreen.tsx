import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../../Types"; // Định nghĩa kiểu dữ liệu cho user

// Định nghĩa kiểu dữ liệu cho user

function UserHomeScreen() {
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);

      if (!token) {
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
        console.log(response.data.user);
        setUserData(response.data.user);

        const userInfo = {
          isLoggedIn: true,
          userData: response.data.user,
        };

        localStorage.setItem("userData", JSON.stringify(userInfo));
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error fetching user details:", err);
        console.log(err.response?.data?.message || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Welcome to User Home Screen</h2>
      <div style={{ textAlign: "center" }}>
        {userData ? (
          <h2>
            Name: {userData.name} <br />
            Email: {userData.email}
          </h2>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}

export default UserHomeScreen;
