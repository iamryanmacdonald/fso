interface SafeExerciseInputs {
  target: number;
  dailyHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): SafeExerciseInputs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (
    !isNaN(Number(args[2])) &&
    !args.slice(3).some((arg) => isNaN(Number(arg)))
  ) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const totalHours = dailyHours.reduce((sum, hours) => (sum += hours), 0);
  const totalDays = dailyHours.length;
  const averageHours = totalHours / totalDays;

  const targetHours = target * totalDays;
  let rating: 1 | 2 | 3 = 1;
  if (totalHours > 0.75 * targetHours) rating = 2;
  if (totalHours > targetHours) rating = 3;

  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = "you're still a long way off";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 3:
      ratingDescription = "you have done more exercise than required";
      break;
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hours) => hours > 0).length,
    success: rating === 3,
    rating,
    ratingDescription,
    target,
    average: averageHours,
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
