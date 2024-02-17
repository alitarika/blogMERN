import express from "express";
import {
  getPosts,
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postsControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all blog posts.
router.get("/", getPosts);

// Get user's blog posts.
router.get("/user", auth, getUserPosts);

// Create a new blog post.
router.post("/", auth, addPost);

// Update/Modify a blog post
router.put("/:id", auth, updatePost);

// Delete a blog post.
router.delete("/:id", auth, deletePost);

export { router as postsRoutes };
