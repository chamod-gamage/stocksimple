import express from 'express';
import { isAuthorized } from '../middleware/jwt.js';
import PortfolioModel from '../models/portfolio.js';
const app = express();

app.post('/', isAuthorized, async (req, res) => {
  const portfolio = new PortfolioModel({
    user_id: req.user._id,
    holdings: req.body,
  });
  try {
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { user_id: req.user._id },
      { user_id: req.user._id, holdings: req.body },
      { new: true, upsert: true }
    );
    res.send(updatedPortfolio);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', isAuthorized, async (req, res) => {
  try {
    const portfolio = await PortfolioModel.findOne({ user_id: req.user._id });
    res.send(portfolio);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
