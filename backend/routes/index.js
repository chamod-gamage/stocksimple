import UserRouter from './user.js';
import express from 'express';

const app = express();
app.use('/users', UserRouter);
app.use('/', (request, response) => {
  response.status(404).send({ message: 'NOT FOUND' });
});
export default app;
