import { Gender } from "./Gender";
interface Entry {}

export interface patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string | undefined;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
