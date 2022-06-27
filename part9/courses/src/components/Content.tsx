interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => (
  <>
    {props.courseParts.forEach((coursePart) => (
      <p>
        {coursePart.name} {coursePart.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
