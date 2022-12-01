const jwt = require('jsonwebtoken')
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require('mongoose')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const Author = require('./schema/author')
const Book = require('./schema/book')
const User = require('./schema/user')



console.log('Connecting to MongoDB . . .')
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected ! ')
}).catch((e) => {
  console.log(`error : ${e}`)
})

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
  }


  type Token {
  value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
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
    me: User
    findBooksByGenre(genre: String): [Book]!
    findAllGenres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author!
    addAuthor(name: String!, born: Int): Author
    login(username: String!, password: String!): Token
    createUser(username: String!, password: String! favoriteGenre: String!): User
  }
  type Subscription {
    bookAdded: Book!
}
`;

const resolvers = {
  Query: {
    authorCount: async () => {
      return await Author.where({}).countDocuments()
    },
    findBook: async (_, args) => {
      return await Book.findOne({ title: args.title })

    },
    findAuthor: async (_, args) => {
      try {
        return await Author.findOne({ name: args.name })
      } catch {
        throw new UserInputError("Error : Could not find author name")
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    allBooks: async () => {
      return await Book.find({})
    },
    me: async (_, __, context) => {
      return context.currentUser
    },
    findBooksByGenre: async (_, args) => {
      if (args.genre === null || args.genre === "") {
        return await Book.find({})
      }
      const books = await Book.find({ genres: { $in: args.genre } })
      return books
    },
    findAllGenres: async () => {
      const genres = new Set()
      const allEntries = await Book.find({})
      for (let entry of allEntries) {
        for (let genre of entry.genres) {
          if (!genres.has(genre)) {
            genres.add(genre)
          }
        }
      }
      return [...genres]
    }
  },
  Mutation: {
    addBook: async (_, args) => {
      if (!args.title || !args.author || !args.published || !args.genres) {
        return null
      }
      const newBook = new Book({ ...args })
      newBook.author = await Author.findOne({ name: { $in: `${args.author}` } })
      try {
        await newBook.save()
      }
      catch {
        throw UserInputError('Could not save new book')
      }
      return newBook;
    },
    editAuthor: (_, args) => {
      const auth = Author.find({ name: args.name })
      if (auth == undefined) {
        throw new UserInputError("Username not found!");
      }
      auth.born = args.setBornTo
      return auth.save()
    },
    addAuthor: async (_, args) => {
      if (!args.name) {
        throw new UserInputError('Name is required.')
      }
      const author = new Author({ ...args })
      return await author.save()
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })
      if (!args.password || !user) {
        throw new UserInputError('Error : No username or password provided.')
      }
      const targetUser = { user: user.username, id: user._id }
      return { value: jwt.sign(targetUser, JWT_SECRET) }
    },
    createUser: async (_, args) => {
      const duplicate = await User.exists({ username: args.username })
      if (!args.favoriteGenre || !args.username || duplicate != null) {
        throw new UserInputError('Error ! Duplicate username or missing parameters.')
      }
      else {
        const newUser = await new User({ username: args.username, favoriteGenre: args.favoriteGenre, password: 'todo' }).save()
        return newUser
      }
    },

  },
  Author: {
    bookCount: async (root, _) => {
      if (!root.name) {
        throw new UserInputError('No author argument provided.')
      }
      return await Book.where({ "author": root._id }).countDocuments()
    },
  },
  Book: {
    author: async (root, _) => {
      return await Author.findById(root.author)
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      return { currentUser: await User.findById(decodedToken.id) }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

