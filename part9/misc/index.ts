import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Result } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({
      error: "Not enough arguments. Needs to include: height (cm), weight (kg)",
    });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi: { height: number; weight: number; bmi: string } = {
    height: heightNumber,
    weight: weightNumber,
    bmi: calculateBmi(heightNumber, weightNumber),
  };

  res.json(bmi);
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    isNaN(Number(target)) ||
    typeof daily_exercises !== "object" ||
    daily_exercises.some((num: number) => isNaN(Number(num)))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result: Result = calculateExercises(
    Number(target),
    daily_exercises.map((num: number) => Number(num))
  );

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
