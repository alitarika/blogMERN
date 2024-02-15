import mongoose from "mongoose";
import Post from "../models/PostModel.js";

// Get *all* blog posts.
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new blog post.
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

// Delete a blog post by ID.
export const deletePost = async (req, res) => {
  // Parse id from the url/request paramaters.
  const { id } = req.params;

  // Check whether or not ID is of valid type.
  // If not return error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "No blog post is found with this ID. (ID is invalid type.)",
    });
  }

  // Check whether the post with that ID exists.
  const post = await Post.findById(id);
  if (!post) {
    return res
      .status(400)
      .json({ error: "No blog post is found with this ID." });
  }

  // Parse title for verbose response. Delete post. Catch error if any.
  try {
    const { title } = post;
    await post.deleteOne();
    return res.status(200).json({
      success: `Post with the title '${title}' is deleted.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
