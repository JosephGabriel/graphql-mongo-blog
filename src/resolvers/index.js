const Query = require("./Query");
const Mutation = require("./Mutation");
const User = require("./User");
const Post = require("./Post");
const Category = require("./Category");

const resolvers = {
  Post,
  User,
  Query,
  Mutation,
  Category,
};

module.exports = resolvers;
