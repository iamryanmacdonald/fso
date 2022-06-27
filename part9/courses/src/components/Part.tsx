import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const { coursePart } = props;

  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
