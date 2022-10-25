const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
    me: User
  }

type Auth {
    token: ID!
    user: User
  }

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

`