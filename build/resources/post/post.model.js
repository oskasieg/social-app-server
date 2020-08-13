"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postShema = new _mongoose.default.Schema({
  authorLogin: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  text: {
    type: String,
    required: true
  },
  photos: {
    type: Array
  },
  likes: [{
    kind: String,
    author: String,
    avatar: String
  }],
  sumLikes: {
    type: String,
    default: 0,
    required: true
  },
  comments: [{
    text: String,
    author: String,
    avatar: String,
    date: Date
  }],
  createdAt: {
    type: Date,
    default: new Date(),
    required: true
  },
  editedAt: {
    type: Date
  }
});

const Post = _mongoose.default.model('post', postShema);

exports.Post = Post;