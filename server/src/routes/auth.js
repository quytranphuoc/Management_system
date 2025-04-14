import express from "express";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js"; // giả sử bạn đã setup kết nối PostgreSQL ở đây

const router = express.Router();


router.post("/request-nonce", async (req, res) => {
  const { address } = req.body;

  if (!address) return res.status(400).json({ message: "Address is required" });

  const nonce = Math.floor(Math.random() * 1000000).toString();

  try {
    // Tìm user đã tồn tại hay chưa
    const result = await pool.query("SELECT * FROM users WHERE wallet_address = $1", [address]);

    if (result.rows.length > 0) {
      // Cập nhật nonce
      await pool.query("UPDATE users SET nonce = $1 WHERE wallet_address = $2", [nonce, address]);
    } else {
      // Tạo user mới với nonce
      await pool.query(
        "INSERT INTO users (wallet_address, nonce, user_type) VALUES ($1, $2, $3)",
        [address, nonce, "student"] // mặc định student
      );
    }

    return res.json({ nonce });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.post("/metamask-login", async (req, res) => {
  const { address, signature } = req.body;

  if (!address || !signature) return res.status(400).json({ message: "Missing fields" });

  try {
    // Lấy nonce từ database
    const result = await pool.query("SELECT * FROM users WHERE wallet_address = $1", [address]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const message = `Login request: ${user.nonce}`;

    // Xác minh chữ ký
    const signerAddr = ethers.verifyMessage(message, signature);

    if (signerAddr.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ message: "Signature verification failed" });
    }

    // Tạo token
    const token = jwt.sign(
      { id: user.id, address: user.wallet_address, userType: user.user_type },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    // Reset nonce để bảo mật (tránh reuse)
    const newNonce = Math.floor(Math.random() * 1000000).toString();
    await pool.query("UPDATE users SET nonce = $1 WHERE id = $2", [newNonce, user.id]);

    return res.json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// routes/auth.ts

