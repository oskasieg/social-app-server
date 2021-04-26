const Post = require("./post.model");
const User = require("../user/user.model");
const sortByDate = require("../../utils/sort");
const path = require("path");

const addPost = async (req, res) => {
  if (
    !req.body.authorLogin ||
    !req.body.title ||
    !req.body.text ||
    !req.body.tags
  ) {
    return res
      .status(400)
      .json({ message: "No valid number of keys in req.body!" });
  }

  try {
    const exist = await Post.findOne({ title: req.body.title });
    if (exist) {
      return res.status(400).json({ message: "Post in the same name exists!" });
    }

    const photos = [];
    for (let i = 0; i < req.files.length; i++) {
      photos.push(
        `https://oskasieg-social-app.herokuapp.com/${req.files[i].filename}`
      );
    }

    const post = await Post.create({
      ...req.body,
      photos,
      createdAt: new Date(),
    });

    const user = await User.findOne({ login: req.body.authorLogin });
    await user.updateOne({ numberOfPosts: user.numberOfPosts + 1 });

    res.status(200).json({ message: "You have added a new post!", post });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while adding new post" });
  }
};

const getManyPosts = async (req, res) => {
  if (!req.body.numberOfPosts) {
    res.status(400).json({ message: "No number of posts!" });
  }

  try {
    const posts = await Post.find();

    sortByDate(posts, "dec");
    posts.forEach((post) => sortByDate(post.comments, "dec"));

    const reducedPosts = posts.slice(0, req.body.numberOfPosts);

    res.status(200).json(reducedPosts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while getting many posts!" });
  }
};

const getUsersPosts = async (req, res) => {
  if (!req.params.login) {
    return res.status(400).json({ message: "No login in req params!" });
  }

  const login = req.params.login.replace("+", " ");

  try {
    const posts = await Post.find({ authorLogin: login });

    sortByDate(posts, "dec");
    posts.forEach((post) => sortByDate(post.comments, "dec"));

    if (!posts) {
      return res
        .status(400)
        .json({ message: "No posts = require( this user!" });
    }

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while getting users posts!" });
  }
};

const getByName = async (req, res) => {
  const title = req.params.name.replace("+", " ");

  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(400).json({ message: "No post with this title!" });
    }

    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while getting post by name!" });
  }
};

const updatePost = async (req, res) => {
  if (!req.body.authorLogin || !req.body.title || !req.body.text) {
    return res
      .status(400)
      .json({ message: "No valid number of keys in req.body!" });
  }

  const title = req.params.name.replace("+", " ");

  const photos = [];
  if (req.files)
    for (let i = 0; i < req.files.length; i++) {
      photos.push(
        `https://oskasieg-social-app.herokuapp.com/${req.files[i].filename}`
      );
    }

  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(400).json({ message: "No post with this title!" });
    }

    let sumLikes = 0;
    if (req.body.likes)
      req.body.likes.forEach((like) => {
        if (like.kind === "plus") sumLikes++;
        if (like.kind === "minus") sumLikes--;
      });

    await post.updateOne(
      {
        ...req.body,
        editedAt: new Date(),
        sumLikes: photos.length > 0 ? post.sumLikes : sumLikes,
        photos: photos.length > 0 ? photos : post.photos,
      },
      { new: false }
    );

    res.status(200).json(req.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while editing a post!" });
  }
};

const removePost = async (req, res) => {
  if (!req.params.name) {
    return res
      .status(400)
      .json({ message: "No post name name in req.params!" });
  }

  const title = req.params.name.replace("+", " ");

  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(400).json({ message: "No post with this title!" });
    }

    await Post.deleteOne(post);

    const user = await User.findOne({ login: req.body.authorLogin });
    await user.updateOne({ numberOfPosts: user.numberOfPosts - 1 });

    return res
      .status(200)
      .json({ message: `Post with title '${title}' was deleted.` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error while deleting post!" });
  }
};

module.exports = {
  addPost,
  getManyPosts,
  getByName,
  updatePost,
  removePost,
  getUsersPosts,
};
