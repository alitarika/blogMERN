import express from "express";
import Post from "../models/PostModel.js";

const router = express.Router();

// Get all blog posts.
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new blog post.
router.post("/", async (req, res) => {
  // Parse data from request body
  const { title, body } = req.body;

  // Check if title or body left blank.
  if (!title || !body) {
    return res
      .status(400)
      .json({ error: "Both the blog title and the blog body is required." });
  }

  // Crate post. If not successfully sent to the DB give server error.
  try {
    const post = await Post.create({ title, body });
    res.status(200).json({ success: "Post is successfully created.", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as postsRoutes };
