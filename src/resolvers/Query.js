const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/user");
const Post = require("../models/post");
const Category = require("../models/category");
const authorize = require("../utils/isAuth");
const sortArgsHelper = require("../utils/sort");

const Query = {
  async user(parent, { id }, { req }, info) {
    const request = authorize(req);
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new AuthenticationError("Usuário inválido");
    }

    if (request._id.toString() !== user._id.toString()) {
      throw new AuthenticationError("Usuário inválido");
    }

    return user;
  },

  async isAuth(parent, args, { req }, info) {
    const request = authorize(req, true);

    if (!request._id) {
      throw new AuthenticationError("Usuário inválido");
    }

    return { ...request };
  },

  async categories(parent, { id }, ctx, info) {
    const opArgs = {};

    if (id) {
      opArgs._id = { id };
    }

    const categories = await Category.find(opArgs);

    return categories;
  },

  async post(parent, { id }, ctx, info) {
    const post = await Post.findOne({ _id: id });

    return post;
  },

  async posts(parent, { sort, query }, ctx, info) {
    const queryBy = {};
    const sortArgs = sortArgsHelper(sort);

    if (query) {
      queryBy[query.key] = query.value;
    }

    const posts = await Post.find(queryBy)
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    return posts;
  },
};

module.exports = Query;
