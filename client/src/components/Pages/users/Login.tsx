import axios from "axios";
import React, { useContext, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../contexts/UserContext";
import { ethers } from "ethers";
// import type { ExternalProvider } from "@ethersproject/providers";
import type { Eip1193Provider } from "ethers";
// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

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
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("authToken", token);
        console.log("userId in localStorage:", localStorage.getItem("userId"));
        console.log("token in localStorage:", localStorage.getItem("token"));
        await fetchUserDetails();
        const userType = response.data.user.userType;
        if (userType === "admin") {
          navigate("/admin");
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
  const handleMetaMaskLogin = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not found!");
      return;
    }

    try {
      // Yêu cầu người dùng kết nối ví
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Gọi backend để lấy nonce từ DB
      const nonceResponse = await axios.post(
        "http://localhost:3000/api/auth_meta/request-nonce",
        {
          address,
        }
      );

      const nonce = nonceResponse.data.nonce;

      // Ký thông điệp bằng MetaMask
      const signature = await signer.signMessage(`Login request: ${nonce}`);

      // Gửi chữ ký lên server xác minh
      const loginResponse = await axios.post(
        "http://localhost:3000/api/auth_meta/metamask-login",
        {
          address,
          signature,
        }
      );

      if (loginResponse.data.success) {
        toast.success("MetaMask login successful!");
        localStorage.setItem("authToken", loginResponse.data.token);
        await fetchUserDetails();
        navigate("/homeScreen");
      } else {
        toast.error(loginResponse.data.message || "MetaMask login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("MetaMask login error");
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#3c50e0] text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
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
      <div className="w-1/2 bg-gradient-to-br from-gray-800 to-[#3c50e0] text-white flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
        <p className="text-center max-w-md text-white/90 mb-6">
          Welcome back! We are so happy to have you here. It’s great to see you
          again. We hope you had a safe and enjoyable time away.
        </p>
        <button
          onClick={handleMetaMaskLogin}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Signin with MetaMask
        </button>
        {/* <Link
          to="/signup"
          className="bg-white text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition duration-200"
        >
          No account yet? Signup.
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
