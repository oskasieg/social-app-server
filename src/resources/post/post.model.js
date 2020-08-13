import mongoose from 'mongoose';

const postShema = new mongoose.Schema({
  authorLogin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  text: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
  },
  likes: [
    {
      kind: String,
      author: String,
      avatar: String,
    },
  ],
  sumLikes: {
    type: String,
    default: 0,
    required: true,
  },
  comments: [
    {
      text: String,
      author: String,
      avatar: String,
      date: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  editedAt: {
    type: Date,
  },
});

export const Post = mongoose.model('post', postShema);
