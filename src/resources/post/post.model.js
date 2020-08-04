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
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  comments: {
    type: Array,
  },
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
