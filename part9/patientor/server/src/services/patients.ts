import { v1 as uuid } from "uuid";

import { NewPatient, Patient, PublicPatient } from "../types";
import patientsData from "../../data/patients";

const patients: Patient[] = patientsData;

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { addPatient, getPublicPatients };
