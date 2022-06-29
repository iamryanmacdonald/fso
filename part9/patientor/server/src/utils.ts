import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewEntryFields,
  NewPatient,
  NewPatientFields,
} from "./types";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isDischarge = (
  discharge: unknown
): discharge is { date: unknown; criteria: unknown } => {
  return (
    isObject(discharge) &&
    Object.keys(discharge).includes("date") &&
    Object.keys(discharge).includes("criteria")
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isObject = (object: unknown): object is object => {
  return typeof object === "object" || object instanceof Object;
};

const isSickLeave = (
  sickLeave: unknown
): sickLeave is { startDate: unknown; endDate: unknown } => {
  return (
    isObject(sickLeave) &&
    Object.keys(sickLeave).includes("startDate") &&
    Object.keys(sickLeave).includes("endDate")
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (
  param: any
): param is "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }

  return date;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCodes) {
    return;
  }

  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect diagnosisCodes");
  }

  const formattedDiagnosisCodes: Array<Diagnosis["code"]> = [];

  diagnosisCodes.forEach((code) => {
    if (!isString(code)) {
      throw new Error("Incorrect diagnosisCodes");
    }

    formattedDiagnosisCodes.push(code);
  });

  return formattedDiagnosisCodes;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  const parsedDischarge = {
    date: parseDischargeDate(discharge.date),
    criteria: parseDischargeCriteria(discharge.criteria),
  };

  return parsedDischarge;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or invalid discharge.criteria");
  }

  return criteria;
};

const parseDischargeDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or invalid discharge.date");
  }

  return date;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } | undefined => {
  if (!sickLeave) {
    return;
  }

  if (!isSickLeave(sickLeave)) {
    throw new Error("Invalid sickLeave");
  }

  const parsedSickLeave = {
    startDate: parseSickLeaveStartDate(sickLeave.startDate),
    endDate: parseSickLeaveEndDate(sickLeave.endDate),
  };

  return parsedSickLeave;
};

const parseSickLeaveEndDate = (endDate: unknown): string => {
  if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing sickLeave.endDate");
  }

  return endDate;
};

const parseSickLeaveStartDate = (startDate: unknown): string => {
  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing sickLeave.startDate");
  }

  return startDate;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrrect or missing specialist");
  }

  return specialist;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseType = (
  type: unknown
): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error("Incorrect or missing type");
  }

  return type;
};

const toNewEntry = ({
  date,
  type,
  specialist,
  diagnosisCodes,
  description,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: NewEntryFields): NewEntry => {
  const newBaseEntry: NewBaseEntry = {
    date: parseDate(date),
    type: parseType(type),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseDescription(description),
  };

  switch (newBaseEntry.type) {
    case "HealthCheck":
      return {
        ...newBaseEntry,
        type: newBaseEntry.type,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case "Hospital":
      return {
        ...newBaseEntry,
        type: newBaseEntry.type,
        discharge: parseDischarge(discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...newBaseEntry,
        type: newBaseEntry.type,
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
    default:
      throw new Error("Incorrect entry");
  }
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

export default { toNewEntry, toNewPatient };
