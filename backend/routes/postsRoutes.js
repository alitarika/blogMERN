import express from "express";
import { getPosts, addPost } from "../controllers/postControllers.js";

const router = express.Router();

// Get all blog posts.
router.get("/", getPosts);

// Create new blog post.
router.post("/", addPost);

export { router as postsRoutes };
