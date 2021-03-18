const User = require("../models/user");
const Post = require("../models/post");

const Category = {
  async author(parent, args, ctx, info) {
    const userId = parent.author;

    const author = await User.findOne({ _id: userId });

    return author;
  },

  async posts(parent, args, ctx, info) {
    const categoryId = parent._id;

    const posts = await Post.find({ category: categoryId });

    return posts;
  },
};

module.exports = Category;
