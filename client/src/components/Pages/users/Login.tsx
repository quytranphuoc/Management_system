import axios from "axios";
import React, { useContext, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../contexts/UserContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        toast.success("Login successful!");
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        await fetchUserDetails();
        const userType = response.data.user.userType;
        if (userType === "admin") {
          navigate("/adminHomeScreen");
        } else {
          navigate("/homeScreen");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: unknown) {
      console.error("Error during login:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-8 py-12 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Signin</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
          >
            Signin
          </button>
        </form>

        {/* Social login */}
        <p className="mt-4 text-gray-500">or signin with</p>
        <div className="flex space-x-4 mt-2">
          <button className="text-blue-600 text-2xl">
            <i className="fab fa-facebook"></i>
          </button>
          <button className="text-red-600 text-2xl">
            <i className="fab fa-google-plus-g"></i>
          </button>
          <button className="text-blue-500 text-2xl">
            <i className="fab fa-linkedin-in"></i>
          </button>
        </div>
      </div>

      {/* Right - Welcome */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
        <p className="text-center max-w-md text-white/90 mb-6">
          Welcome back! We are so happy to have you here. It’s great to see you
          again. We hope you had a safe and enjoyable time away.
        </p>
        <Link
          to="/signup"
          className="bg-white text-green-700 px-6 py-2 rounded-full font-medium hover:bg-green-100 transition duration-200"
        >
          No account yet? Signup.
        </Link>
      </div>
    </div>
  );
};

export default Login;
