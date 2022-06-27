import express from "express";

import patientService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getPublicPatients();

  res.json(patients);
});

export default router;
