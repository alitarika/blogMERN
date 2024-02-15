import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

// Get all blog posts.
router.get("/", getPosts);

// Create a new blog post.
router.post("/", addPost);

// Delete a blog post.
router.delete("/:id", deletePost);

export { router as postsRoutes };
