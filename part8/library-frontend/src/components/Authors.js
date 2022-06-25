import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState({});
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await updateAuthor({ variables: { name: name.value, born: Number(born) } });

    setName("");
    setBorn("");
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          value={name}
          onChange={(selectedOption) => setName(selectedOption)}
          options={authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
