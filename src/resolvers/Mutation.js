const { AuthenticationError } = require("apollo-server-express");
const authorize = require("../utils/isAuth");
const userOwnership = require("../utils/tool");

const User = require("../models/user");
const Post = require("../models/post");
const Category = require("../models/category");

const Mutation = {
  async authUser(parent, { data }, ctx, info) {
    try {
      const user = await User.findOne({
        email: data.email,
      });

      if (!user) {
        throw new AuthenticationError("Email ou senha inválido");
      }

      const password = user.comparePassword(data.password);

      if (!password) {
        throw new AuthenticationError("Email ou senha inválido");
      }

      const result = await user.generateToken();

      return result;
    } catch (error) {
      throw new Error(`Erro ao fazer login: ${error}`);
    }
  },

  async signUp(parent, { data }, ctx, info) {
    try {
      const user = new User({
        ...data,
      });

      const result = await user.generateToken();

      if (!result) {
        throw new AuthenticationError("Não foi possível criar sua conta");
      }

      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw new AuthenticationError("Email em uso");
      }

      throw new Error(`Erro ao criar conta: ${error}`);
    }
  },

  async updateUser(parent, { id, data }, { req }, info) {
    const request = authorize(req);

    if (!userOwnership(request, id)) {
      throw new AuthenticationError("Usuário inválido");
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );

    return user;
  },

  async updateUserEmPass(parent, { id, data }, { req }, info) {
    const request = authorize(req);

    if (!userOwnership(request, id)) {
      throw new AuthenticationError("Usuário inválido");
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new AuthenticationError("Usuário inválido");
    }

    if (typeof data.email === "string") {
      user.email = data.email;
    }

    if (typeof data.password === "string") {
      user.password = data.password;
    }

    const result = await user.generateToken();

    return result;
  },

  async createPost(parent, { data }, { req }, info) {
    const request = authorize(req);

    const post = new Post({
      ...data,
      author: request._id,
    });

    const result = await post.save();

    return result;
  },

  async updatePost(parent, { id, data }, { req }, info) {
    const request = authorize(req);
    const post = await Post.findOne({ _id: id });

    if (!userOwnership(request, post.author)) {
      throw new AuthenticationError("Post inválido");
    }

    for (key in data) {
      if (post[key] != data[key]) {
        post[key] = data[key];
      }
    }

    const result = await post.save();

    return result;
  },

  async createCategory(parent, { data }, { req }, info) {
    const request = authorize(req);

    const category = new Category({
      ...data,
      author: request._id,
    });

    const result = await category.save();

    return result;
  },
};

module.exports = Mutation;
