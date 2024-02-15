import express from "express";
import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

// Get all blog posts.
router.get("/", getPosts);

// Create a new blog post.
router.post("/", addPost);

// Update/Modify a blog post
router.put("/:id", updatePost);

// Delete a blog post.
router.delete("/:id", deletePost);

export { router as postsRoutes };
