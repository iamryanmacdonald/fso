const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  let returnValue: string;

  if (bmi < 16) returnValue = "Underweight (Severe thinness)";
  if (bmi < 17) returnValue = "Underweight (Moderate thinness)";
  if (bmi < 18.5) returnValue = "Underweight (Mild thinness)";
  if (bmi < 25) returnValue = "Normal (Healthy)";
  if (bmi < 30) returnValue = "Overweight (Pre-obese)";
  if (bmi < 35) returnValue = "Obese (Class I)";
  if (bmi < 40) returnValue = "Obese (Class II)";
  returnValue = "Obese (Class III)";

  return returnValue;
};

console.log(calculateBmi(180, 74));
