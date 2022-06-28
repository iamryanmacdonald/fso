import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import React from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { addPatient, setPatient, useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "../components/EntryDetails";

const IconMap = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <TransgenderIcon />,
};

const PatientPage = () => {
  const [{ patient, patients }, dispatch] = useStateValue();
  const { patientId } = useParams<{ patientId: string }>();

  React.useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(setPatient(patientFromApi));
        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patientId) {
      if (patients[patientId] && patients[patientId].ssn) {
        dispatch(setPatient(patients[patientId]));
      } else {
        void fetchPatient(patientId);
      }
    }
  }, [patientId]);

  return (
    <>
      {patient && (
        <div>
          <div>
            <h2 style={{ display: "inline-block", marginRight: 10 }}>
              {patient.name}
            </h2>
            {IconMap[patient.gender]}
          </div>
          <div>SSN: {patient.ssn}</div>
          <div>Occupation: {patient.occupation}</div>
          <h3>Entries</h3>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
};

export default PatientPage;
