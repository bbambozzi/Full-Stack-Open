import { useEffect, useState } from "react";
import { ALL_BOOKS_FILTERED } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useFilteredBooks = (initialFilter) => {
  const [books, setBooks] = useState(null);
  const [filter, setFilter] = useState(initialFilter);

  const updateBooks = (data) => {
    setBooks(data.findBooksByGenre);
  };

  useQuery(ALL_BOOKS_FILTERED, {
    variables: { genre: filter },
    onCompleted: updateBooks,
  });

  return [books, setFilter];
};

export default useFilteredBooks;
