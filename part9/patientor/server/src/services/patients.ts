import { v1 as uuid } from "uuid";

import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from "../types";
import patientsData from "../../data/patients";

const patients: Patient[] = patientsData;

const addEntry = (id: string, newEntry: NewEntry): Patient => {
  const patient = findById(id);

  if (!patient) {
    throw new Error("patient not found");
  }

  const entry: Entry = {
    id: uuid(),
    ...newEntry,
  };

  patient.entries.push(entry);

  return patient;
};

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
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export default { addEntry, addPatient, findById, getPublicPatients };
