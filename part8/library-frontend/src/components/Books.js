import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ALL_BOOKS,
  FIND_ALL_GENRES,
  ALL_BOOKS_FILTERED,
} from "../graphql/queries";
import useFilteredBooks from "../hooks/useFilteredBooks";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  const [books, setBooksFilter] = useFilteredBooks(""); // extract logic unto custom hook
  const allGenresResult = useQuery(FIND_ALL_GENRES);

  useEffect(() => {
    setBooksFilter(genreFilter);
  }, [genreFilter]);
  /*
  useEffect(() => {
    if (booksQueryResult.loading === false) {
      setBooks(booksQueryResult.data.allBooks);
    }
  }, [booksQueryResult]); // eslint-disable-line
  */
  useEffect(() => {
    if (allGenresResult.loading === false) {
      setGenres(allGenresResult.data.findAllGenres);
    }
  });

  const HandleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "Select Genre") {
      setGenreFilter("");
      return;
    }
    setGenreFilter(value);
  };

  useEffect(() => {
    console.log(books);
  }, [books]);

  useEffect(() => {
    if (books === null) {
      return;
    }
  }, [books]); // eslint-disable-line

  if (!props.show) {
    return null;
  }
  if (books === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>

            {books.length > 0
              ? books.map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <>
        <h4>Filters</h4>
        <h5>
          {genreFilter === ""
            ? "No filter selected"
            : `Current filter is ${genreFilter}`}
        </h5>
        {genres.length > 0
          ? genres.map((g) => {
              return <button key={g}>{g}</button>;
            })
          : null}

        <select onChange={HandleFilterChange}>
          <option>Select Genre</option>
          {genres.map((g) => {
            return <option key={g}>{g}</option>;
          })}
        </select>
      </>
    </>
  );
};

export default Books;
