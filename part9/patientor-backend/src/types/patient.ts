import { Gender } from "./Gender";
export interface patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string | undefined;
  gender: Gender;
  occupation: string;
}
