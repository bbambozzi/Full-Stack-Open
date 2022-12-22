import express from "express";
import cors from "cors";
import patientRouter from "./routes/patientRouter";
import diagnosesRouter from "./routes/diagnosesRouter";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log("Connected to PORT", PORT);
});
