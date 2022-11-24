import { gql } from "@apollo/client";
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      genres
    }
  }
`;

const FIND_AUTHOR = gql`
  query findAuthor($authorToSearch: String!) {
    findAuthor(author: $authorToSearch) {
      name
      born
    }
  }
`;

const FIND_BOOK = gql`
  query findBook($bookToSearch: String!) {
    findBook(book: $bookToSearch) {
      title
      published
      author
      genres
    }
  }
`;

export { FIND_AUTHOR, FIND_BOOK, ALL_AUTHORS, ALL_BOOKS };
