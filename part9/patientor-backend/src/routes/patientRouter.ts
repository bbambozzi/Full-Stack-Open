import express from "express";
const router = express.Router();
import patientService from "../services/patientsService";
import { patient } from "../types/patient";

router.use("/", (_req, res) => {
  res.json(
    patientService.getPatients().map(({ ssn, ...rest }: patient) => rest)
  );
});

export default router;
