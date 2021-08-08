import express from 'express';
import { generateToken, isAuthorized } from '../middleware/jwt.js';
import UserModel from '../models/user.js';

const app = express();

app.get('/', isAuthorized, async (req, res) => {
  const users = await UserModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/authorized', isAuthorized, async (req, res) => {
  try {
    res.send({ authorized: true, ...req.user });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  const user = new UserModel(req.body);
  try {
    if (await UserModel.findOne({ username: user.username })) {
      res.status(409).send({ message: 'Username Already Exists' });
      return;
    }
    await user.save();
    await generateToken(res, user._doc._id, user._doc.username);
    const { password, ...rest } = user._doc;
    res.send(rest);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
