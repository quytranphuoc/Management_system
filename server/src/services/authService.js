// services/userService.js
import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

// Register User
export const registerUser = async (user) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);
    if (result.rows.length > 0) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users (student_id, name, email, phone, password, user_type) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [
      user.student_id,
      user.username,
      user.email,
      user.phone,
      hashedPassword,
      user.user_type,
    ];
    await pool.query(query, values);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again later.",
    };
  }
};

// Login User with JWT token
export const loginUser = async (email, password) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Incorrect password" };
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.usertype },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, userType: user.usertype },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed. Please try again later." };
  }
};

// Get User Details from Token
export const getUserFromToken = async (token) => {
  try {
    const trimmedToken = token.trim();
    const decoded = jwt.verify(trimmedToken, JWT_SECRET);

    const result = await pool.query(
      "SELECT id, name, email, phone, user_type FROM users WHERE id = $1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = result.rows[0];
    return { success: true, user };
  } catch (error) {
    console.error("Token verification error:", error);
    return { success: false, message: "Invalid or expired token" };
  }
};
