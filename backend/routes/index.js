import UserRouter from './user.js';
import PortfolioRouter from './portfolio.js';
import express from 'express';

const app = express();

app.use('/users', UserRouter);
app.use('/portfolio', PortfolioRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'ROUTE NOT FOUND' });
});

export default app;
