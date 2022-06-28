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

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

export default { addPatient, findById, getPublicPatients };
