// // import React from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import {
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemIcon,
// //   ListItemText,
// //   Typography,
// //   Box,
// // } from "@mui/material";
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import PaidIcon from '@mui/icons-material/Paid';
// // const DrawerNavbar = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // Define navigation items
// //   const navItems = [
// //     {
// //       text: "User Management",
// //       icon: <AccountCircleIcon />,
// //       path: "/User/user-management",
// //     },
// //     {
// //       text: "Tuition",
// //       icon: <PaidIcon />,
// //       path: "/User/tuition",
// //     },
// //   ];

// //   return (
// //     <Drawer
// //       variant="permanent"
// //       sx={{
// //         width: 240,
// //         flexShrink: 0,
// //         [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
// //       }}
// //     >
// //       <Box sx={{ padding: 2, textAlign: "center" }}>
// //         <Typography variant="h6" fontWeight="bold">
// //           User Panel
// //         </Typography>
// //       </Box>
// //       <List>
// //         {navItems.map((item) => (
// //           <ListItem key={item.text} disablePadding>
// //             <ListItemButton
// //               onClick={() => navigate(item.path)}
// //               sx={{
// //                 backgroundColor: location.pathname === item.path ? "#1976d2" : "transparent",
// //                 color: location.pathname === item.path ? "white" : "inherit",
// //                 "&:hover": {
// //                   backgroundColor: "#1565c0",
// //                   color: "white",
// //                 },
// //               }}
// //             >
// //               <ListItemIcon
// //                 sx={{
// //                   color: location.pathname === item.path ? "white" : "inherit",
// //                 }}
// //               >
// //                 {item.icon}
// //               </ListItemIcon>
// //               <ListItemText primary={item.text} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Drawer>
// //   );
// // };

// // export default DrawerNavbar;
// import React, { useState } from "react";
// import { Avatar, Text } from "antd";
// import { useLocation, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PaidIcon from "@mui/icons-material/Paid";
// import axios from "axios";
// import profileImg from "../../../assets/image/img1.png";
// import { IUser } from "../../Types";
// const navItems = [
//   { to: "/user", label: "Dashboard", icon: <DashboardIcon /> },
//   { to: "/User/user-management", label: "User", icon: <AccountCircleIcon /> },
//   { to: "/User/tuition", label: "Tuition", icon: <PaidIcon /> },
//   { to: "/User/settings", label: "Settings", icon: <SettingsIcon /> },
// ];
// const location = useLocation();
// const navigate = useNavigate();
// const [userData, setUserData] = useState<IUser | null>(null);

// useEffect(() => {
//   fetchUserDetails();
// }, []);

// const fetchUserDetails = async (): Promise<void> => {
//   try {
//     const token = localStorage.getItem("authToken");
//     if (!token) return;

//     const response = await axios.get(
//       "http://localhost:3000/api/auth/get-userDetails",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.data.success) {
//       setUserData(response.data.user);
//       localStorage.setItem(
//         "userData",
//         JSON.stringify({ isLoggedIn: true, userData: response.data.user })
//       );
//     } else {
//       console.log(response.data.message);
//     }
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.error("Error fetching user details:", err);
//     } else {
//       console.error("Unexpected error:", err);
//     }
//   }
// };

// const logout = () => {
//   localStorage.clear();
//   setUserData(null);
//   navigate("/");
// };
// const DrawerNavbar = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
//       {/* Logo */}
//       <div className="h-20 flex items-center justify-center border-b border-gray-200">
//         {userData && (
//           <div
//             style={{
//               padding: "16px",
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//             }}
//           >
//             <Avatar src={profileImg} size="large" />
//             <div>
//               <Text strong>{userData.name}</Text>
//               <br />
//               <Text type="secondary" style={{ fontSize: 12 }}>
//                 {userData.email}
//               </Text>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6">
//         <ul className="space-y-2">
//           {navItems.map((item) => (
//             <li key={item.to}>
//               <NavLink
//                 to={item.to}
//                 end={item.to === "/User"}
//                 className={({ isActive }) =>
//                   `group flex items-center gap-3 px-4 py-2 text-sm font-normal transition-all duration-200 ${
//                     isActive
//                       ? "bg-[#eef4ff] text-[#3c50e0] border-l-4 border-[#3c50e0] rounded-r-md pl-5 font-medium"
//                       : "text-[#64748b] hover:bg-gray-100 pl-4"
//                   }`
//                 }
//               >
//                 {item.icon}
//                 {item.label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Logout */}
//       <div className="border-t border-gray-200 p-4">
//         <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50">
//           <i className="fas fa-sign-out-alt"></i>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DrawerNavbar;

import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "antd";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidIcon from "@mui/icons-material/Paid";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
import profileImg from "../../assets/image/img1.png";
import { IUser } from "../../Types";

const { Text } = Typography;

const navItems = [
  // {
  //   to: "/user",
  //   label: " Student profile ",
  //   icon: <AccountCircleOutlinedIcon />,
  // },
  { to: "/homeScreen/profile", label: "User", icon: <AccountCircleIcon /> },
  { to: "/homeScreen/timeline", label: "Timeline", icon: <ViewTimelineIcon /> },
  {
    to: "/homeScreen/learning-results",
    label: "Learning results",
    icon: <PrintIcon />,
  },
  { to: "/homeScreen/tuition", label: "Tuition", icon: <PaidIcon /> },
  { to: "/User/settings", label: "Settings", icon: <SettingsIcon /> },
];

const DrawerNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserDetails = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

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
          localStorage.setItem(
            "userData",
            JSON.stringify({ isLoggedIn: true, userData: response.data.user })
          );
        } else {
          console.warn(response.data.message);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Error fetching user details:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Profile Section */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200 px-4">
        {userData && (
          <div className="flex items-center gap-3">
            <Avatar src={profileImg} size="large" />
            <div>
              <Text strong>{userData.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {userData.email}
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/user"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 rounded-md ${
                    isActive
                      ? "bg-[#eef4ff] text-[#3c50e0] border-l-4 border-[#3c50e0] pl-5 font-medium"
                      : "text-[#64748b] hover:bg-gray-100 pl-4"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DrawerNavbar;
