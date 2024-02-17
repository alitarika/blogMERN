import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

// initialize dotenv config and parse SECRET
dotenv.config();
const { SECRET } = process.env;

const auth = async (req, res, next) => {
  // Check whether authorization is in request headers
  // If not return HTTP 401 (unauthorized)
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Parse token by omitting the Bearer part
  const token = authorization.split(" ")[1];

  try {
    // Decrypt the token with the SECRET and destruct/parse user _id
    const { id } = jwt.verify(token, SECRET);

    // Find user and select it and send it to request
    req.user = await User.findById(id).select("_id");

    // Go to the next func or middleware
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
