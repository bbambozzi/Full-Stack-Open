import express from "express";
const router = express.Router();
import patientService from "../services/patientsService";
import { patient } from "../types/patient";
import { publicPatient } from "../types/publicPatient";

router.get("/", (_req, res) => {
  res.json(
    patientService
      .getPatients()
      .map(({ ssn, ...rest }: patient): publicPatient => rest)
  );
});

router.get("/:id", (req, res) => {
  const id: string | undefined = req.params.id;
  const ans: patient | undefined = patientService.getPatientById(id);
  if (ans) {
    res.json(ans).end();
    return;
  }
  res.json({ error: "not found" }).end();
});

export default router;
