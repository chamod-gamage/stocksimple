import express from 'express';
import { isAuthorized } from '../middleware/jwt.js';
const app = express();

app.post('/', isAuthorized, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', isAuthorized, async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.body);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
