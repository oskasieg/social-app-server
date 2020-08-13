import { User } from './user.model';
import { newToken } from '../../utils/auth';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  if (!req.body.login || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.interests || !req.body.age) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  }

  try {
    const user = { ...req.body, followers: 0, likes: 0, numberOfPosts: 0, lastLogin: new Date(), createdAt: new Date() };

    const token = newToken(user);

    await User.create(user);
    res.status(200).json({ user: user, token: token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error while creating account!' });
  }
};

export const signIn = async (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(400).json({ message: 'No login or password!' });
  }

  const user = await User.findOne({ login: req.body.login });
  if (!user) {
    return res.status(401).json({ message: 'No user in database!' });
  }

  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(402).json({ message: 'Invalid password!' });
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

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "User isn't exist!" });
  }
};

export const editProfile = async (req, res) => {
  if (req.file && req.body.login) {
    try {
      const user = await User.findOne({ login: req.body.login });

      const url = `http://localhost:8000/${req.file.filename}`;
      await user.updateOne({ avatar: url });
    } catch (e) {
      console.error(e);
    }
  } else if (
    !req.body.login ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password ||
    !req.body.interests ||
    !req.body.age ||
    !req.body.avatar
  ) {
    return res.status(400).json({ message: 'No valid number of keys in req.body!' });
  } else {
    try {
      const user = await User.findOne({ login: req.body.login });

      const hashPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 8, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });

      await user.updateOne({
        ...req.body,
        interests: req.body.interests,
        password: hashPassword,
      });

      res.status(200).json({ ...req.body, interests: req.body.interests, password: hashPassword });
    } catch (e) {
      res.status(500).json({ message: 'Server error!' });
    }
  }
};

// methods
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
