const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorLogin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 5,
    max: 20,
  },
  text: {
    type: String,
    min: 10,
    max: 200,
    required: true,
  },
  photos: {
    type: Array,
  },
  comments: [
    {
      text: String,
      author: String,
      avatar: String,
      createdAt: Date,
    },
  ],
  tags: {
    type: Array,
    required: true,
  },
  likes: [
    {
      kind: String,
      author: String,
      avatar: String,
    },
  ],
  sumLikes: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  editedAt: {
    type: Date,
  },
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;
