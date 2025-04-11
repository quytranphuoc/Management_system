import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/Pages/users/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default CSS for toastify
import UserHomeScreen from "./components/Pages/users/UserHomeScreen";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import AdminHomeScreen from "./pages/AdminHomeScreen";
import { UserProvider } from "./contexts/UserContext";
const Login = lazy(() => import("./components/Pages/users/Login"));
const Signup = lazy(() => import("./components/Pages/users/Signup"));
const NotFound = lazy(() => import("./components/Pages/NotFound"));
const AdminHomeScreen = lazy(
  () => import("./components/Pages/admin/AdminHomeScreen")
);

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homeScreen" element={<UserHomeScreen />} />
            <Route path="/adminHomeScreen" element={<AdminHomeScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick
          // pauseOnHover
          theme="colored"
        />
      </Router>
    </UserProvider>
  );
};

export default App;
