import express from 'express';
import UserModel from '../models/user.js';

const app = express();

app.get('/', async (request, response) => {
  const users = await UserModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/', async (request, response) => {
  const user = new UserModel(request.body);
  try {
    if (await UserModel.findOne({ username: user.username })) {
      response.status(409).send({ message: 'Username Already Exists' });
      return;
    }
    await user.save();
    const { password, ...rest } = user._doc;
    response.send(rest);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default app;
