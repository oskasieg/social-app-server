"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postSchema = new _mongoose.default.Schema({
  authorLogin: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 5,
    max: 20
  },
  text: {
    type: String,
    min: 10,
    max: 200,
    required: true
  },
  photos: {
    type: Array
  },
  comments: [{
    text: String,
    author: String,
    avatar: String,
    createdAt: Date
  }],
  tags: {
    type: Array,
    required: true
  },
  likes: [{
    kind: String,
    author: String,
    avatar: String
  }],
  sumLikes: {
    type: Number,
    default: 0,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  editedAt: {
    type: Date
  }
});

const Post = _mongoose.default.model('post', postSchema);

exports.Post = Post;