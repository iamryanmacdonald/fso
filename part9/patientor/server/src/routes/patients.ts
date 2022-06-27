import express from "express";

import utils from "../utils";
import patientService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getPublicPatients();

  res.json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;
