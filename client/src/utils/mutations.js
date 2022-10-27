import gql from "graphql-tag";

// Mutation function to handle Login

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {_idusername
      }
    }
  }
`;

// Mutation function to handle Adding a User

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

// Mutation function to handle saving searched books

export const SAVE_BOOK = gql`
mutation saveBook($input: SavedBookInput) {
    saveBook(input: $input) {
      username
      _id
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

// Mutation function to handle removing saved books

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    username
    bookCount
    savedBooks {
      bookId
      authors
      image
      link
      title
      description
    }
  }
}
`;