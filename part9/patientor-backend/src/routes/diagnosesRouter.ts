import express from "express";
const router = express.Router({ mergeParams: true });
import diagnosisService from "../services/diagnosisService";

router.get("/", (_, res) => {
  res.json(diagnosisService.getDiagnoses()).end();
  return;
});

router.get("/:code", (req, res) => {
  const code: string = req.params.code;
  return res.json(diagnosisService.findDiagnosis(code));
});

export default router;
