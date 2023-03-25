import express from "express";
import ActiveSession from "../models/activeSession";
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    (await ActiveSession.findByPk(req.params.id))?.destroy();
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(204);
  }
});
