import express from "express";
import cors from "cors";
import patientRouter from "./routes/patientRouter";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log("Connected to PORT", PORT);
});
