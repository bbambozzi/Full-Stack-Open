import diagnoses from "../data/diagnoses.json";
import { diagnostic } from "../types/diagnostic";

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

const findDiagnosis = (code: string): diagnostic | string => {
  return diagnoses.find((d) => d.code == code) || "not found";
};

export default { getDiagnoses, addDiagnoses, diagnosesAmount, findDiagnosis };
