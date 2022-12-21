import allPatients from "../data/patients.json";
/*
import { newPatient } from "../types/newPatient";
*/
import { patient } from "../types/patient";
import { Gender } from "../types/Gender";

let patients: Array<patient> = allPatients as patient[];

const parseGender = (gender: string): Gender => {
  if (!gender || typeof gender !== "string" || !(gender in Gender)) {
    throw new Error("Error: Gender invalid");
  }
  return gender as Gender;
};

const parseString = (str: unknown): string => {
  if (typeof str !== "string" || !str) {
    throw new Error("Not a string!");
  }
  return str as string;
};

const getPatients = (): patient[] => {
  return patients;
};

const addPatient = ({
  id,
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}): patient => {
  const newPatient: patient = {
    id: parseString(id),
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const patientAmount = (): number => {
  return patients.length;
};

const getPatientById = (id: string): patient | undefined => {
  const result: undefined | patient = patients.find((p) => p.id === id);
  return result;
};

export default { getPatients, addPatient, patientAmount, getPatientById };
