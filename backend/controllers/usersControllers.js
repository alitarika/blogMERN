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

  // Create user
  try {
    const user = await User.create({ username, password });
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  res.send("log");
};
