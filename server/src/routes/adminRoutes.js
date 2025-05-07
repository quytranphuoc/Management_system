import express from "express";
import { importUsers, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

// POST /api/users/import
router.post("/import-data-user", importUsers);
router.get("/list-users", getAllUsers);

export default router;
