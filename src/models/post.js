const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    excerpt: {
      required: true,
      type: String,
      maxlength: 1000,
    },
    content: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["Rascunho", "Publicado"],
      default: "Rascunho",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
