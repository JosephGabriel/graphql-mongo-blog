const User = require("../models/user");
const Category = require("../models/category");
const sortArgsHelper = require("../utils/sort");

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

  async related(parent, args, ctx, info) {
    const sortArgs = sortArgsHelper(sort);

    const posts = await Post.find({ category: parent.category })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    return posts;
  },
};

module.exports = Post;
