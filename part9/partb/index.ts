import express from "express";
import { calculateBmi } from "./calculateBmi";
import bodyParser from "body-parser";
import { calculateExercises, ExercisesResult } from "./exerciseCalculator";
const PORT = 3001;
const app = express();
interface userWeightInfo {
  weight: number;
  height: number;
}
app.use(bodyParser.json());
/*
interface exercisesInfo {
  daily_exercises: number[];
  target: number;
}
*/

app.get("/fullstack", (_, res) => {
  res.send("Hello, fullstack!");
});

app.get("/test", (req, res) => {
  const bmiParams: userWeightInfo = {
    weight: Number(req.query.weight),
    height: Number(req.query.height),
  };
  console.log(`Received : ${JSON.stringify(bmiParams)}`);
  if (Number.isNaN(bmiParams.height) || Number.isNaN(bmiParams.weight)) {
    res.json({ error: "Invalid request" }).end();
    console.log("Invalid request sent.");
  } else {
    console.log(`Got a valid request.`);
    const userWeightResponse: string = calculateBmi(
      bmiParams.height,
      bmiParams.weight
    );
    console.log(userWeightResponse);
    res.json({ result: userWeightResponse }).end();
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line
  console.log(req.body.daily_exercises);
  // eslint-disable-next-line
  if (!req || isNaN(req.body.target)) {
    res.status(400).json({ error: "invalid request" });
  }
  // eslint-disable-next-line
  const reqTarget = Number(req.body.target);
  // eslint-disable-next-line
  const reqDailyExercises: number[] = req.body.daily_exercises;
  const ans: ExercisesResult = calculateExercises(reqDailyExercises, reqTarget);
  res.status(200).json(ans).end();
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
