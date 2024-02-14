import Post from "../models/PostModel.js";

// Get all blog posts.
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new blog post.
export const addPost = async (req, res) => {
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
};
