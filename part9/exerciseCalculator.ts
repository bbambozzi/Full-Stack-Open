interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const userTarget: number = Number(process.argv[2]);
const userArrayData: number[] = process.argv
  .splice(3)
  .map((elem) => Number(elem));

console.log(`User target ${userTarget}, User Array Data : ${userArrayData}`);

const calculateExercises = (
  data: number[],
  target: number
): ExercisesResult => {
  const periodLength: number = data.length;
  const average: number = data.reduce((acc, cur) => acc + cur, 0) / data.length;
  const trainingDays: number = data.reduce(
    (acc, cur) => (cur !== 0 ? acc + 1 : acc),
    0
  );
  const success: boolean = average >= target;
  const rating: number = !success
    ? 1
    : success && average >= target * 1.2
    ? 3
    : 2;
  const ratingDescription: string =
    rating === 1
      ? "Try harder next time!"
      : rating === 2
      ? "Objective complete!"
      : "Objective exceeded! 👏👏👏";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises(userArrayData, userTarget));
