import React, { useContext } from "react";
import Header from "../../layouts/Header";
import { UserContext } from "../../../contexts/UserContext";
import Navbar from "../../layouts/DrawerNavBarAdmin";
import { Outlet } from "react-router-dom";
import DrawerNavbar from "../../layouts/DrawerNavBarAdmin";
import Box from "@mui/material/Box";
// const AdminHomeScreen: React.FC = () => {
//   const { userData, error } = useContext(UserContext);

//   if (error) {
//     return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
//   }

//   return userData ? (
//     <div>
//       <Header />
//       <h2 style={{ textAlign: "center" }}>Welcome to Admin Home Screen</h2>
//       <div style={{ textAlign: "center" }}>
//         <h2>
//           Name: {userData.name} <br /> Email: {userData.email}
//         </h2>
//       </div>
//     </div>
//   ) : null;
// };



const AdminLayout = () => {
  return (
    <div>
        <Box sx={{ display: "flex" }}>
          <DrawerNavbar />
          <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
            <Outlet />
          </Box>
        </Box>
    </div>
  );
};

export default AdminLayout;