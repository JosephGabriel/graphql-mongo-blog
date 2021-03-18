const Post = require("../models/post");
const Category = require("../models/category");
const sortArgsHelper = require("../utils/sort");

const User = {
  async posts(parent, { sort }, ctx, info) {
    const userId = parent._id;

    const sortArgs = sortArgsHelper(sort);

    const posts = await Post.find({ author: userId })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    return posts;
  },

  async categories(parent, args, ctx, info) {
    const userId = parent._id;

    const categories = await Category.find({ author: userId });

    return categories;
  },
};

module.exports = User;
