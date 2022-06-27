interface SafeBMIInputs {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): SafeBMIInputs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

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

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };
