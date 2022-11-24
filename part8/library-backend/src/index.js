const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors(name: String): [Author]
    findBook(book: String!): Book
    findAuthor(author: String!): Author 
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author!
  }
`;

const resolvers = {
  Query: {
    authorCount: () => {
      return authors.length;
    },
    findBook: (_, args) => {
      if (!args.book) {return null}
      return books.find((b) => b.title === args.book)

    },
    findAuthor: (_, args) => {
      if (!args.author) {return null}
      return authors.find((a) => a.name === args.author)

    },
    allAuthors: (_, args) => {
      if (!args.author) {
        return authors;
      }
      return authors.find((a) => a.name === args.name);
    },
    allBooks: (_, args) => {
      if (args.author) {
        const filtered = books.filter((b) => b.author === args.author);
        if (!args.genre) {
          return filtered;
        }
        return filtered.filter((b) => b.genres.includes(args.genre));
      }
      return books;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      if (!args.title || !args.author || !args.published || !args.genres){
        return null
      }
      const newBook = { ...args, id: uuidv4() };
      books = books.concat(newBook);
      return newBook;
    },
    editAuthor: (_, args) => {
      const oldAuthor = authors.find((a) => a.name === args.name);
      if (oldAuthor == undefined) {
        throw new UserInputError("Username not found!");
      }
      const newAuthor = { ...oldAuthor, born: args.setBornTo };
      authors = authors.map((a) => (a.name !== args.name ? a : newAuthor));
      return authors.find((a) => a.name === args.name);
    },
  },
  Author: {
    bookCount: (root, ) => {
      return (count = books.reduce((acc, cur) => {
        return cur.author === root.name ? acc + 1 : acc;
      }, 0));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
