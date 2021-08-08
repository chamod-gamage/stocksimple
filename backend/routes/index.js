import UserRouter from './user.js';
import express from 'express';

const app = express();

app.use('/users', UserRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'NOT FOUND' });
});

export default app;
