import { Gender } from "./Gender";
export interface newPatient {
  name: string;
  dateOfBirth: string;
  ssn?: string | undefined;
  gender: Gender;
  occupation: string;
}
