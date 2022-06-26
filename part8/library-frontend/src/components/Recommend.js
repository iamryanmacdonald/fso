import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);

  const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  useEffect(() => {
    if (meResult.data) {
      getBooks({ variables: { genre: meResult.data.me.favouriteGenre } });
    }
  }, [getBooks, meResult]);

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks);
    }
  }, [bookResult]);

  if (!props.show) {
    return null;
  }

  if (meResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favourite genre <b>{meResult.data.me.favouriteGenre}</b>
      </div>
      {bookResult.loading ? (
        <>
          <br />
          <div>Loading...</div>
        </>
      ) : books.length === 0 ? (
        <>
          <br />
          <div>No books found</div>
        </>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recommendations;
