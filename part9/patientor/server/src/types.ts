export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: "male" | "female";
  occupation: string;
}

export type PublicPatient = Omit<Patient, "ssn">;
