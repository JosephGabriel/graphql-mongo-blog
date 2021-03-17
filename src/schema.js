const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    isAuth: User!
  }

  type Mutation {
    authUser(data: LoginInput!): User!
    signUp(data: AuthInput!): User!

    updateUser(id: ID!, data: UpdateUserInput!): User!
    updateUserEmPass(id: ID!, data: UpdateUserEmPassInput!): User!

    createPost(data: PostInput!): Post!
    createCategory(data: CategoryInput!): Category!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    lastname: String
    token: String
    posts: [Post!]!
    categories: [Category!]!
  }

  type Post {
    _id: ID!
    title: String!
    excerpt: String!
    content: String!
    createdAt: String
    updatedAt: String
    author: User!
    category: Category!
    status: PostStatus
  }

  type Category {
    _id: ID!
    name: String!
    author: User!
    posts: [Post!]!
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

  input UpdateUserInput {
    name: String
    lastname: String
  }

  input UpdateUserEmPassInput {
    email: String
    password: String
  }

  input PostInput {
    title: String!
    excerpt: String!
    content: String!
    category: ID!
    status: PostStatus
  }

  input CategoryInput {
    name: String!
  }

  enum PostStatus {
    Rascunho
    Publicado
  }
`;

module.exports = typeDefs;
