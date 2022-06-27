import { Diagnosis } from "../types";
import diagnosesData from "../../data/diagnoses";

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
