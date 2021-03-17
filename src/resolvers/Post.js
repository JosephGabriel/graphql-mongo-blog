const User = require("../models/user");
const Category = require("../models/category");

const Post = {
  async author(parent, args, ctx, info) {
    const userId = parent.author;

    const author = await User.findOne({ _id: userId });

    return author;
  },

  async category(parent, args, ctx, info) {
    const categoryId = parent.category;

    const category = await Category.findById({ _id: categoryId });

    return category;
  },
};

module.exports = Post;
