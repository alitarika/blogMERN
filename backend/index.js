import express from "express";
import cors from "cors";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const { PORT, MONGODBURL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
