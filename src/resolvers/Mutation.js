const User = require("../models/user");

const Mutation = {
  async authUser(parent, args, ctx, info) {
    return "hello";
  },

  async signUp(parent, { data }, ctx, info) {
    try {
      const user = new User({
        ...data,
      });

      const result = await user.generateToken();

      if (!result) {
        throw new Error("");
      }
      console.log(result);

      return result;
    } catch (error) {
      throw new Error(`Erro ao criar conta: ${error}`);
    }
  },
};

module.exports = Mutation;
