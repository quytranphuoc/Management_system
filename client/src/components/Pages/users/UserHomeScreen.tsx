// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { IUser } from "../../../Types"; // Định nghĩa kiểu dữ liệu cho user

// // Định nghĩa kiểu dữ liệu cho user

// function UserHomeScreen() {
//   const [userData, setUserData] = useState<IUser | null>(null);

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const fetchUserDetails = async (): Promise<void> => {
//     try {
//       const token = localStorage.getItem("authToken");
//       console.log(token);

//       if (!token) {
//         return;
//       }

//       const response = await axios.get(
//         "http://localhost:3000/api/auth/get-userDetails",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         console.log(response.data.user);
//         setUserData(response.data.user);

//         const userInfo = {
//           isLoggedIn: true,
//           userData: response.data.user,
//         };

//         localStorage.setItem("userData", JSON.stringify(userInfo));
//       } else {
//         console.log(response.data.message || "Failed to fetch user details");
//       }
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.error("Error fetching user details:", err);
//         console.log(err.response?.data?.message || "An error occurred");
//       } else {
//         console.error("An unexpected error occurred:", err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Welcome to User Home Screen</h2>
//       <div style={{ textAlign: "center" }}>
//         {userData ? (
//           <h2>
//             Name: {userData.name} <br />
//             Email: {userData.email}
//           </h2>
//         ) : (
//           <p>Loading user info...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserHomeScreen;

// ------------------------------------------------------------------------------------=-----------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Layout, Menu, Avatar, Typography, Button, Divider } from "antd";
// import {
//   DashboardOutlined,
//   UserOutlined,
//   DollarOutlined,
//   SettingOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import profileImg from "../../../assets/image/img1.png";
// import { IUser } from "../../../Types"; // import kiểu dữ liệu

// const { Sider } = Layout;
// const { Text } = Typography;

// const UserHomeScreen = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState<IUser | null>(null);

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const fetchUserDetails = async (): Promise<void> => {
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) return;

//       const response = await axios.get(
//         "http://localhost:3000/api/auth/get-userDetails",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setUserData(response.data.user);
//         localStorage.setItem(
//           "userData",
//           JSON.stringify({ isLoggedIn: true, userData: response.data.user })
//         );
//       } else {
//         console.log(response.data.message);
//       }
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.error("Error fetching user details:", err);
//       } else {
//         console.error("Unexpected error:", err);
//       }
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUserData(null);
//     navigate("/");
//   };

//   // const menuItems = [
//   //   {
//   //     key: "/admin",
//   //     icon: <DashboardOutlined />,
//   //     label: "Dashboard",
//   //   },
//   //   {
//   //     key: "/user/profile",
//   //     icon: <UserOutlined />,
//   //     label: "User Management",
//   //   },
//   //   {
//   //     key: "/admin/tuition",
//   //     icon: <DollarOutlined />,
//   //     label: "Tuition",
//   //   },
//   //   {
//   //     key: "/admin/settings",
//   //     icon: <SettingOutlined />,
//   //     label: "Settings",
//   //   },
//   // ];

//   return (
//     <Sider width={250} style={{ height: "100vh", background: "#fff" }}>
//       <div style={{ padding: "16px", textAlign: "center" }}>
//         <Text strong style={{ fontSize: 18, color: "#3c50e0" }}>
//           Admin Panel
//         </Text>
//       </div>

//       {/* User Info from fetched data */}
//       {userData && (
//         <div
//           style={{
//             padding: "16px",
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//           }}
//         >
//           <Avatar src={profileImg} size="large" />
//           <div>
//             <Text strong>{userData.name}</Text>
//             <br />
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               {userData.email}
//             </Text>
//           </div>
//         </div>
//       )}

//       <Divider style={{ margin: 0 }} />

//       <Menu
//         mode="inline"
//         selectedKeys={[location.pathname]}
//         items={menuItems}
//         onClick={({ key }) => navigate(key)}
//         style={{ borderRight: 0 }}
//       />

//       {userData && (
//         <div style={{ marginTop: "auto", padding: 16 }}>
//           <Button
//             icon={<LogoutOutlined />}
//             type="text"
//             danger
//             block
//             onClick={logout}
//           >
//             Logout
//           </Button>
//         </div>
//       )}
//     </Sider>
//   );
// };

// export default UserHomeScreen;
import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "antd";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import axios from "axios";

import { IUser } from "../../../Types";

import Header from "../../layouts/Header";
import { UserContext } from "../../../contexts/UserContext";
import Navbar from "../../layouts/DrawerNavBarAdmin";
import { Outlet } from "react-router-dom";
import DrawerNavbar from "../../layouts/DrawerNarbarUser";
import Box from "@mui/material/Box";
import profileImg from "../../../assets/image/img1.png";
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
