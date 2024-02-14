import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ mesaj: "hi from sw to postman" });
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
