import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <b>
        total of {parts.reduce((sum, part) => (sum += part.exercises), 0)}{" "}
        exercises
      </b>
    </div>
  );
};

export default Course;
