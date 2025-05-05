// routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-user", getAllUsers);
router.post("/create-user", createUser);
router.get("/:id", getUserById);
export default router;
