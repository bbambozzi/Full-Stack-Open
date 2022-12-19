import express from "express";

const PORT = 3001;

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json({ res: "pong" });
});

app.listen(PORT, () => {
  console.log("Listening to", PORT);
});
