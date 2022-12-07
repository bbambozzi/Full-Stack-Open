import diagnoses from "../data/diagnoses.json";
import { diagnostic } from "../types/diagnostic";
import router from "../index";

const getDiagnoses = (): diagnostic[] => {
  return diagnoses;
};

const addDiagnoses = (newDiagnosis: diagnostic): diagnostic[] => {
  diagnoses.push(newDiagnosis);
  return diagnoses;
};

const diagnosesAmount = (): number => {
  return diagnoses.length;
};

export { getDiagnoses, addDiagnoses, diagnosesAmount };
