import express from "express";
import patientsService from "../services/patientsService";
const router = express.Router();
import patientService from "../services/patientsService";
import { BaseEntryInput } from "../types/Entries";
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

router.post("/:id", (req, res) => {
  try {
    const addedPatient = patientsService.addPatient(req.body);
    res.status(201).json({ patient: addedPatient });
  } catch (e) {
    console.error(`Error : ${e}`);
    res.status(400).json({ error: "Invalid!" }).end();
    return;
  }
});

router.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;
  const newEntry: BaseEntryInput = req.body;
  if (!newEntry) {
    res.status(401).json({ error: "Expected JSON entry" });
  }
  res.status(201).json(newEntry);
  try {
    patientService.addEntry(patientId, newEntry);
  } catch (e: any) {
    console.error(`${e.message}`);
    res.status(404).json({ error: e.message });
    return;
  }
});

export default router;
