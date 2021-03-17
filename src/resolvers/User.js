const Post = require("../models/post");
const Category = require("../models/category");

const User = {
  async posts(parent, args, ctx, info) {
    const userId = parent._id;

    const posts = await Post.find({ author: userId });

    return posts;
  },

  async categories(parent, args, ctx, info) {
    const userId = parent._id;

    const categories = await Category.find({ author: userId });

    return categories;
  },
};

module.exports = User;
