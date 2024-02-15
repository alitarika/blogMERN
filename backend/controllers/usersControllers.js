import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

/* 
  IMPLEMENTED WITHOUT PASSWORD CONFIRMATION FOR SIMPLICITY REASONS.
  IMPLEMENT PASS CONFIRMATION LATER.
*/

// Register User - Create user in DB
export const registerUser = async (req, res) => {
  // Parse username and pass from request body
  const { username, password } = req.body;

  // Check if username or password left blank.
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Both the username and password is required." });
  }

  // Check if username already exists.
  const alreadyExists = await User.findOne({ username });
  if (alreadyExists) {
    return res.status(400).json({
      error: "This username is already taken. Please choose another username.",
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  // Parse username and pass from request body
  const { username, password } = req.body;

  // Check if username or password left blank.
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Both the username and password is required." });
  }

  // Check if a user with the username exists.
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      error: "Incorrect username.",
    });
  }

  // Destructure the hashed password in DB as hashedPassword
  const { password: hashedPassword } = user;

  // Check if password is correct.
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password." });
  }

  try {
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
