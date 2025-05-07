// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Box,
// } from "@mui/material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PaidIcon from '@mui/icons-material/Paid';
// const DrawerNavbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Define navigation items
//   const navItems = [
//     {
//       text: "User Management",
//       icon: <AccountCircleIcon />,
//       path: "/admin/user-management",
//     },
//     {
//       text: "Tuition",
//       icon: <PaidIcon />,
//       path: "/admin/tuition",
//     },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
//       }}
//     >
//       <Box sx={{ padding: 2, textAlign: "center" }}>
//         <Typography variant="h6" fontWeight="bold">
//           Admin Panel
//         </Typography>
//       </Box>
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               onClick={() => navigate(item.path)}
//               sx={{
//                 backgroundColor: location.pathname === item.path ? "#1976d2" : "transparent",
//                 color: location.pathname === item.path ? "white" : "inherit",
//                 "&:hover": {
//                   backgroundColor: "#1565c0",
//                   color: "white",
//                 },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   color: location.pathname === item.path ? "white" : "inherit",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default DrawerNavbar;
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/admin/user-management", label: "User", icon: <AccountCircleIcon /> },
  { to: "/admin/tuition", label: "Tuition", icon: <PaidIcon /> },
  { to: "/admin/settings", label: "Settings", icon: <SettingsIcon /> },
];
const DrawerNavbar = () => {
  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">Admin Management</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-2 text-sm font-normal transition-all duration-200 ${isActive
                    ? "bg-[#eef4ff] text-[#3c50e0] border-l-4 border-[#3c50e0] rounded-r-md pl-5 font-medium"
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
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DrawerNavbar;
