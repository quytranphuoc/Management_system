import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/Pages/users/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default CSS for toastify
import UserHomeScreen from "./components/Pages/users/UserHomeScreen";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserProvider } from "./contexts/UserContext";
import ListUserScreen from "./components/Pages/admin/user_management/ListUserScreen";

const Login = lazy(() => import("./components/Pages/users/Login"));
const Signup = lazy(() => import("./components/Pages/users/Signup"));
const NotFound = lazy(() => import("./components/Pages/NotFound"));
const AdminHomeScreen = lazy(
  () => import("./components/Pages/admin/AdminManagerScreen")
);

// Wrapper component to handle conditional rendering of Header
const AppContent = () => {
  const location = useLocation();

  // Define routes where the Header should not be displayed
  const hideHeaderRoutes = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homeScreen" element={<UserHomeScreen />} />
          <Route path="/admin" element={<AdminHomeScreen />}>
          <Route path="user-management" element={<ListUserScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;