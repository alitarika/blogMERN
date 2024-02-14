import express from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const { PORT, MONGODBURL } = process.env;

app.use(express.json());
app.use("/api/posts", postsRoutes);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
