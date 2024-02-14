import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ mesaj: "hi from sw to postman" });
});

router.post("/", (req, res) => {
  res.status(200).json(req.body);
});

export { router as postsRoutes };
