import React, { useContext } from "react";
import Header from "../../layouts/Header";
import { UserContext } from "../../../contexts/UserContext";

const AdminHomeScreen: React.FC = () => {
  const { userData, error } = useContext(UserContext);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return userData ? (
    <div>
      <Header />
      <h2 style={{ textAlign: "center" }}>Welcome to Admin Home Screen</h2>
      <div style={{ textAlign: "center" }}>
        <h2>
          Name: {userData.name} <br /> Email: {userData.email}
        </h2>
      </div>
    </div>
  ) : null;
};

export default AdminHomeScreen;
