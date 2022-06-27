interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[]): result => {
  const totalHours = dailyHours.reduce((sum, hours) => (sum += hours), 0);
  const totalDays = dailyHours.length;
  const averageHours = totalHours / totalDays;

  const target = 2;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
