import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Signup
router.post("/signup", registerUser);

// Login
router.post("/login", loginUser);

export default router;
