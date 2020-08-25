"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePost = exports.updatePost = exports.getByName = exports.getUsersPosts = exports.getManyPosts = exports.addPost = void 0;

var _post = require("./post.model");

var _user = require("../user/user.model");

var _sort = require("../../utils/sort");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addPost = async (req, res) => {
  if (!req.body.authorLogin || !req.body.title || !req.body.text || !req.body.tags) {
    return res.status(400).json({
      message: 'No valid number of keys in req.body!'
    });
  }

  try {
    const exist = await _post.Post.findOne({
      title: req.body.title
    });

    if (exist) {
      return res.status(400).json({
        message: 'Post in the same name exists!'
      });
    }

    const photos = [];

    for (let i = 0; i < req.files.length; i++) {
      photos.push(`http://localhost:8000/${req.files[i].filename}`);
    }

    const post = await _post.Post.create(_objectSpread(_objectSpread({}, req.body), {}, {
      photos,
      createdAt: new Date()
    }));
    const user = await _user.User.findOne({
      login: req.body.authorLogin
    });
    await user.updateOne({
      numberOfPosts: user.numberOfPosts + 1
    });
    res.status(200).json({
      message: 'You have added a new post!',
      post
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while adding new post'
    });
  }
};

exports.addPost = addPost;

const getManyPosts = async (req, res) => {
  if (!req.body.numberOfPosts) {
    res.status(400).json({
      message: 'No number of posts!'
    });
  }

  try {
    const posts = await _post.Post.find();
    (0, _sort.sortByDate)(posts, 'dec');
    posts.forEach(post => (0, _sort.sortByDate)(post.comments, 'dec'));
    const reducedPosts = posts.slice(0, req.body.numberOfPosts);
    res.status(200).json(reducedPosts);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while getting many posts!'
    });
  }
};

exports.getManyPosts = getManyPosts;

const getUsersPosts = async (req, res) => {
  if (!req.params.login) {
    return res.status(400).json({
      message: 'No login in req params!'
    });
  }

  const login = req.params.login.replace('+', ' ');

  try {
    const posts = await _post.Post.find({
      authorLogin: login
    });
    (0, _sort.sortByDate)(posts, 'dec');
    posts.forEach(post => (0, _sort.sortByDate)(post.comments, 'dec'));

    if (!posts) {
      return res.status(400).json({
        message: 'No posts from this user!'
      });
    }

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while getting users posts!'
    });
  }
};

exports.getUsersPosts = getUsersPosts;

const getByName = async (req, res) => {
  const title = req.params.name.replace('+', ' ');

  try {
    const post = await _post.Post.findOne({
      title
    });

    if (!post) {
      return res.status(400).json({
        message: 'No post with this title!'
      });
    }

    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while getting post by name!'
    });
  }
};

exports.getByName = getByName;

const updatePost = async (req, res) => {
  if (!req.body.authorLogin || !req.body.title || !req.body.text) {
    return res.status(400).json({
      message: 'No valid number of keys in req.body!'
    });
  }

  const title = req.params.name.replace('+', ' ');
  const photos = [];
  if (req.files) for (let i = 0; i < req.files.length; i++) {
    photos.push(`http://localhost:8000/${req.files[i].filename}`);
  }

  try {
    const post = await _post.Post.findOne({
      title
    });

    if (!post) {
      return res.status(400).json({
        message: 'No post with this title!'
      });
    }

    let sumLikes = 0;
    if (req.body.likes) req.body.likes.forEach(like => {
      if (like.kind === 'plus') sumLikes++;
      if (like.kind === 'minus') sumLikes--;
    });
    await post.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
      editedAt: new Date(),
      sumLikes: photos.length > 0 ? post.sumLikes : sumLikes,
      photos: photos.length > 0 ? photos : post.photos
    }), {
      new: false
    });
    res.status(200).json(req.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while editing a post!'
    });
  }
};

exports.updatePost = updatePost;

const removePost = async (req, res) => {
  if (!req.params.name) {
    return res.status(400).json({
      message: 'No post name name in req.params!'
    });
  }

  const title = req.params.name.replace('+', ' ');

  try {
    const post = await _post.Post.findOne({
      title
    });

    if (!post) {
      return res.status(400).json({
        message: 'No post with this title!'
      });
    }

    await _post.Post.deleteOne(post);
    const user = await _user.User.findOne({
      login: req.body.authorLogin
    });
    await user.updateOne({
      numberOfPosts: user.numberOfPosts - 1
    });
    return res.status(200).json({
      message: `Post with title '${title}' was deleted.`
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: 'Error while deleting post!'
    });
  }
};

exports.removePost = removePost;