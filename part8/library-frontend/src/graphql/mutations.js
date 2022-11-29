import { gql } from "@apollo/client";

const NEW_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $year: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $year, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      bookCount
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export { NEW_BOOK, EDIT_AUTHOR, LOGIN };
