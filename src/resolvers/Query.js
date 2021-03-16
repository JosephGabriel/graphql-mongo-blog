const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/user");
const authorize = require("../utils/isAuth");

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
};

module.exports = Query;
