const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

mongoose.connect(process.env.MONGODB_URI);

const JWT_SECRET = process.env.JWT_SECRET;

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    createUser(username: String!, favouriteGenre: String!): User
    editAuthor(name: String!, setBornTo: Int!): Author
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => 0,
  },
  Query: {
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.genre && args.genre !== "all genres") {
        filter = { ...filter, genres: args.genre };
      }

      return Book.find(filter).populate("author");
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author: author.id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book.populate("author");
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return user;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return author;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
