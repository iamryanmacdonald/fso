import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");

  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getBooks({ variables: { genre: genreFilter } });
  }, [genreFilter]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return (
      <div>
        <h2>books</h2>
        Loading...
      </div>
    );
  }

  const books = result.data.allBooks;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenreFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
