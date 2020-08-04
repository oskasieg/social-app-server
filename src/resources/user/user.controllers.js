import { User } from './user.model';
import { newToken } from '../../utils/auth';

export const signUp = async (req, res) => {
  if (!req.body.login || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.interests || !req.body.age) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  }

  try {
    const user = { ...req.body, followers: 0, likes: 0, numberOfPosts: 0 };

    await User.create(user);
    res.status(200).json({ message: 'You have created an account!' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'User already exists!' });
  }
};

export const signIn = async (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(400).json({ message: 'No login or password!' });
  }

  const user = await User.findOne({ login: req.body.login });
  if (!user) {
    return res.status(400).json({ message: 'No user in database!' });
  }

  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid password!' });
    }

    await user.updateOne({ lastLogin: new Date() });

    const token = newToken(user);
    res.status(200).json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "User isn't exist!" });
  }
};

export const getProfile = async (req, res) => {
  if (!req.body.login) {
    return res.status(400).json({ message: 'No login!' });
  }

  try {
    const user = await User.findOne({ login: req.body.login });

    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "User isn't exist!" });
  }
};

export const editProfile = async (req, res) => {
  if (
    !req.body.login ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password ||
    !req.body.interests ||
    !req.body.age ||
    !req.body.avatar
  ) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  }

  try {
    const user = await User.findOne({ login: req.body.login });
    await user.updateOne(req.body);

    updateLikes('increment', req.body.login);

    res.status(200).json({ user: req.body });
  } catch (e) {
    res.status(500).json({ message: "User isn't exist!" });
  }
};

export const updateLikes = async (type, login) => {
  try {
    const user = await User.findOne({ login });

    switch (type) {
      case 'increment': {
        await user.updateOne({ likes: user.likes + 1 });
        console.log(`\n${login}: got a like!`);
        break;
      }
      case 'decrement': {
        await user.updateOne({ likes: user.likes - 1 });
        console.log(`\n${login}: lost a like!`);
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const updateFollowers = async (type, login) => {
  try {
    const user = await User.findOne({ login });

    switch (type) {
      case 'increment': {
        await user.updateOne({ followers: user.followers + 1 });
        console.log(`\n${login}: got a follower!`);
        break;
      }
      case 'decrement': {
        await user.updateOne({ followers: user.followers - 1 });
        console.log(`\n${login}: lost a follower!`);
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

export const updateNumberOfPosts = async (type, login) => {
  try {
    const user = await User.findOne({ login });

    switch (type) {
      case 'increment': {
        await user.updateOne({ numberOfPosts: user.numberOfPosts + 1 });
        console.log(`\n${login}: created post!`);
        break;
      }
      case 'decrement': {
        await user.updateOne({ numberOfPosts: user.numberOfPosts - 1 });
        console.log(`\n${login}: removed post!`);
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
};
