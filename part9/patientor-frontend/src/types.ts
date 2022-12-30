export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum PatientEntryTypes {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: BaseEntry[];
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  type: PatientEntryTypes;
  diagnosisCodes?: string[];
}
