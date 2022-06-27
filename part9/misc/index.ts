import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res
      .status(400)
      .json({
        error:
          "Not enough arguments. Needs to include: height (cm), weight (kg)",
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
