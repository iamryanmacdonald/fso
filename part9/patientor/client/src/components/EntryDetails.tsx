import StarRating from "./StarRating";
import { useStateValue } from "../state";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

const style = {
  borderRadius: 5,
  borderStyle: "solid",
  borderWidth: 1,
  marginBottom: 10,
  padding: 10,
};

const HealthCheckDetails = ({
  diagnoses,
  entry,
}: {
  diagnoses: { [id: string]: Diagnosis };
  entry: HealthCheckEntry;
}) => (
  <div style={style}>
    <div>{entry.date}</div>
    <div>
      <i>{entry.description}</i>
    </div>
    <StarRating value={entry.healthCheckRating} />
    <div>Diagnosed by {entry.specialist}</div>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const HospitalDetails = ({
  diagnoses,
  entry,
}: {
  diagnoses: { [id: string]: Diagnosis };
  entry: HospitalEntry;
}) => (
  <div style={style}>
    <div>{entry.date}</div>
    <div>
      <i>{entry.description}</i>
    </div>
    <div>
      Discharged {entry.discharge.date}: {entry.discharge.criteria}
    </div>
    <div>Diagnosed by {entry.specialist}</div>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const OccupationalHealthcareDetails = ({
  diagnoses,
  entry,
}: {
  diagnoses: { [id: string]: Diagnosis };
  entry: OccupationalHealthcareEntry;
}) => (
  <div style={style}>
    <div>
      {entry.date} - {entry.employerName}
    </div>
    <div>
      <i>{entry.description}</i>
    </div>
    {entry.sickLeave && (
      <div>
        Sick leave taken from {entry.sickLeave.startDate} until{" "}
        {entry.sickLeave.endDate}
      </div>
    )}
    <div>Diagnosed by {entry.specialist}</div>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            {code} {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
  const [{ diagnoses }] = useStateValue();
  const { entry } = props;

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails diagnoses={diagnoses} entry={entry} />;
    case "Hospital":
      return <HospitalDetails diagnoses={diagnoses} entry={entry} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareDetails diagnoses={diagnoses} entry={entry} />
      );
  }
};

export default EntryDetails;
