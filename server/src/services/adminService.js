import { pool } from "../config/db.js";
import UserModel from "../models/userModel.js";

export const importUsersService = async (users) => {
  const insertedUsers = [];

  console.log("user from client", users);

  for (const user of users) {
    const {
      name,
      student_id,
      department,
      phone,
      address,
      email,
      user_type = "user",
    } = user;

    try {
      await pool.query(
        `INSERT INTO users 
          (name, student_id, department, phone, address, email, user_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          name,
          student_id,
          department,
          phone,
          address,
          email,
          user_type,
        ]
      );
      insertedUsers.push(name);
    } catch (err) {
      console.error(`Error inserting user ${name}:`, err.message);
      // Bạn có thể lựa chọn: throw lỗi luôn hoặc skip user lỗi và tiếp tục
    }
  }

  return insertedUsers;
};

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users WHERE user_type = 'user'");
    return result.rows; // <- đây là danh sách users
  };