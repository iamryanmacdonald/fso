const Part = ({ part }) => {
  const { exercises, name } = part;

  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
