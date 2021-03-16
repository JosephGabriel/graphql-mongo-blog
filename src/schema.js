const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    isAuth: User!
  }

  type Mutation {
    authUser(data: LoginInput!): User!
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

  input LoginInput {
    email: String!
    password: String!
  }

  input AuthInput {
    name: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
