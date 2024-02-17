import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// initialize dotenv config and parse SECRET
dotenv.config();
const { SECRET } = process.env;

// Create JWToken func
// sign => 1.payload as obj 2.secret 3.options as obj
const createToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "7d" });
};

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

  try {
    // Create user
    const user = await User.create({ username, password: hashedPassword });
    // Create JWT and send as 200 response
    const token = createToken(user._id);
    res.status(200).json({ username, token });
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
    // Create JWT and send as 200 response
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
