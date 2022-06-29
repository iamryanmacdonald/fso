import express from "express";

import utils from "../utils";
import patientService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getPublicPatients();

  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = utils.toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = utils.toNewEntry(req.body);

    const updatedPatient = patientService.addEntry(req.params.id, newEntry);

    res.json(updatedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;
