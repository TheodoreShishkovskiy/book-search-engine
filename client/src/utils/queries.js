import gql from "graphql-tag";

// GraphQL for GET_ME
// This will allow the users info to do things such as save books etc.

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    savedBooks {
      title
      bookId
      authors
      description
      image
      link
    }
  }
}
`;