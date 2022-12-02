interface WeightCategory {
  category: string;
  health: string;
}

const userIntHeight: number = Number(process.argv[2]);
const userWeight: number = Number(process.argv[3]);

const calculateBmi = (intHeight: number, weight: number): string => {
  let stringed_intHeight: string = intHeight.toString();
  const initialNumber: string =
    stringed_intHeight.length > 2 ? stringed_intHeight[0] : "0";
  const restOfNumber: string =
    stringed_intHeight.length < 2
      ? stringed_intHeight
      : stringed_intHeight.slice(1);
  const height: number = parseFloat(`${initialNumber}.${restOfNumber}`);
  const bmi: number = weight / height ** 2;
  const category: string =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : "Overweight";
  const health: string =
    category === "Normal" ? "Healthy Weight" : "Unhealthy Weight";
  const currentPerson: WeightCategory = { category, health };
  return `${currentPerson.category} ${currentPerson.health}`;
};

console.log(`User Height : ${userIntHeight} , User Weight : ${userWeight}`);
console.log(calculateBmi(userIntHeight, userWeight));
