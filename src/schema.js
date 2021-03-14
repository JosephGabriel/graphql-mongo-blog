const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    authUser(data: AuthInput!): User!
    signUp(data: AuthInput!): User!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    lastname: String
    token: String
  }

  input AuthInput {
    name: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
