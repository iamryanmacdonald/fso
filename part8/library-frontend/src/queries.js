import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation changeAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`;
