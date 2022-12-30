import allPatients from "../data/patients";
import { BaseEntryInput, BaseEntry } from "../types/Entries";
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
  return gender.toUpperCase() as Gender;
};

const parseString = (str: unknown): string => {
  if (typeof str !== "string" || !str) {
    throw new Error(
      "Incomplete! Expected id, name, dateOfBirth, ssn, gender, occupation."
    );
  }
  return str as string;
};

const getPatients = (): patient[] => {
  return patients;
};

const addPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}): patient => {
  const newPatient: patient = {
    id: Date.now().toString(),
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

const addEntry = (
  patientId: string,
  entryToAdd: BaseEntryInput
): patient | Error => {
  const foundPatient = patients.find((p) => p.id === patientId);
  if (!foundPatient) {
    console.log('Patient not found.')
    throw Error("Patient not found");
  }
  try {
    const finalEntryToAdd: BaseEntry = {
      ...entryToAdd,
      id: Date.now().toString(),
      date: Date.now().toString(),
    };
    foundPatient.entries.push(finalEntryToAdd);
    patients = allPatients.map((p) => (p.id === patientId ? foundPatient : p));
    console.log('Added new entry!')
    return foundPatient;
  } catch (e) {
    throw Error("Error : Could not add new entry");
  }
};

const patientAmount = (): number => {
  return patients.length;
};

const getPatientById = (id: string): patient | undefined => {
  const result: undefined | patient = patients.find((p) => p.id === id);
  return result;
};

export default {
  getPatients,
  addPatient,
  patientAmount,
  getPatientById,
  addEntry,
};
