import { useQuery } from "@apollo/client";
import { useState } from "react";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");

  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;

  const filteredBooks =
    genreFilter === "all genres"
      ? books
      : books.filter((book) => book.genres.includes(genreFilter));

  const genresObj = {};

  books.forEach((book) =>
    book.genres.forEach((genre) => (genresObj[genre] = true))
  );

  genresObj["all genres"] = true;

  const genres = Object.keys(genresObj);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button onClick={() => setGenreFilter(genre)}>{genre}</button>
      ))}
    </div>
  );
};

export default Books;
