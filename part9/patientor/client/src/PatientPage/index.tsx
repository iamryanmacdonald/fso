import axios from "axios";
import { Button } from "@material-ui/core";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import React from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { addPatient, setPatient, useStateValue } from "../state";
import { EntryFormValues, Patient } from "../types";
import EntryDetails from "../components/EntryDetails";
import { AddEntryModal } from "../AddPatientModal";

const IconMap = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <TransgenderIcon />,
};

const PatientPage = () => {
  const [{ patient, patients }, dispatch] = useStateValue();
  const { patientId } = useParams<{ patientId: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patientId) {
        let postValues = {};

        if (values.type === "Hospital") {
          postValues = {
            ...values,
            discharge: {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria,
            },
          };
        }

        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          postValues
        );

        dispatch(addPatient(updatedPatient));
        dispatch(setPatient(updatedPatient));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </div>
      )}
    </>
  );
};

export default PatientPage;
