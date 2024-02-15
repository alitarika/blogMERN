import express from "express";
import { registerUser, loginUser } from "../controllers/usersControllers.js";

const router = express.Router();

// Register user
router.post("/", registerUser);

// Register user
router.post("/login", loginUser);

export { router as usersRoutes };
