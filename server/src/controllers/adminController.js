import { importUsersService, getAllUsersService } from "../services/adminService.js";

export const importUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const result = await importUsersService(users);
    res.status(201).json({ message: "Users imported successfully", inserted: result });
  } catch (error) {
    console.error("Error importing users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};