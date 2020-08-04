import { Post } from './post.model';
import { sortByDate } from '../../utils/sort';

export const addPost = async (req, res) => {
  if (!req.body.authorLogin || !req.body.title || !req.body.text || !req.body.photos) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  }

  try {
    const exist = await Post.findOne({ title: req.body.title });
    if (exist) {
      return res.status(400).json({ message: 'Post in the same name exists!' });
    }

    const post = await Post.create(req.body);

    res.status(200).json({ message: 'You have added a new post!' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while adding new post' });
  }
};

export const getManyPosts = async (req, res) => {
  if (!req.body.numberOfPosts) {
    res.status(400).json({ message: 'No number of posts!' });
  }

  try {
    const posts = await Post.find();

    sortByDate(posts, 'dec');

    const reducedPosts = posts.slice(0, req.body.numberOfPosts);

    res.status(200).json({ posts: reducedPosts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while getting many posts!' });
  }
};

export const getByName = async (req, res) => {
  const title = req.params.name.replace('+', ' ');

  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(400).json({ message: 'No post with this title!' });
    }

    res.status(200).json({ post });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while getting post by name!' });
  }
};

export const updatePost = async (req, res) => {
  if (!req.body.authorLogin || !req.body.title || !req.body.text || !req.body.photos) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  }

  const title = req.params.name.replace('+', ' ');

  try {
    const post = await Post.findOne({ title });
    if (!post) {
      return res.status(400).json({ message: 'No post with this title!' });
    }

    await post.updateOne({ ...req.body, editedAt: new Date() });

    res.status(200).json({ post: req.body });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error while editing a post!' });
  }
};
