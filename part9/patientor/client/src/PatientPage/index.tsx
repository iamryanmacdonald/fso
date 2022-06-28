import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import React from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

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
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    if (patientId) {
      if (patients[patientId]) {
        dispatch({ type: "SET_PATIENT", payload: patients[patientId] });
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
        </div>
      )}
    </>
  );
};

export default PatientPage;
