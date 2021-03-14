const { AuthenticationError } = require("apollo-server-express");

const User = require("../models/user");

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
};

module.exports = Mutation;
