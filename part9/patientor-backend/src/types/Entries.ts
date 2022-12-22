export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  diagnosisCodes?: string[];
}
