import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type UserType = "user" | "admin";

interface SignUpFormValues {
  username: string;
  email: string;
  mobile: string;
  password: string;
  userType: UserType;
  secretKey: string;
}

const SignUp: React.FC = () => {
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    username: "",
    email: "",
    mobile: "",
    password: "",
    userType: "user",
    secretKey: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValues.userType === "admin" && formValues.secretKey !== "Adarsh") {
      toast.error("Invalid Secret Key for Admin!!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register-user",
        formValues
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        setFormValues({
          username: "",
          email: "",
          mobile: "",
          password: "",
          userType: "user",
          secretKey: "",
        });
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message ||
            "Something went wrong. Please try again later."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-8 py-12 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {/* Radio */}
          <div>
            <label className="block font-medium mb-1">User Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={formValues.userType === "user"}
                  onChange={handleInputChange}
                />
                User
              </label>
              {/* <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={formValues.userType === "admin"}
                  onChange={handleInputChange}
                />
                Admin
              </label> */}
            </div>
          </div>

          {/* Secret Key */}
          {formValues.userType === "admin" && (
            <div>
              <label className="block font-medium mb-1">
                Secret Key (Admin Only)
              </label>
              <input
                type="text"
                name="secretKey"
                placeholder="Enter Secret Key"
                value={formValues.secretKey}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Input fields */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formValues.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right - Welcome */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
        <p className="text-center max-w-md text-white/90 mb-6">
          Ready to join the community? Let’s get you set up and ready to explore
          everything we have to offer!
        </p>
        <Link
          to="/login"
          className="bg-white text-green-700 px-6 py-2 rounded-full font-medium hover:bg-green-100 transition duration-200"
        >
          Already a member? Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
