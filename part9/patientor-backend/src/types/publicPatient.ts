import { patient } from "./patient";

export type publicPatient = Omit<patient, "ssn">;
