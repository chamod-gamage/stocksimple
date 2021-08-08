import UserRouter from './user.js';
import express from 'express';

const app = express();
app.use('/users', UserRouter);

export default app;
