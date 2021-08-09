import express from 'express';
import { isAuthorized } from '../middleware/jwt.js';
import PortfolioModel from '../models/portfolio.js';
const app = express();

app.post('/', isAuthorized, async (req, res) => {
  const user_id = req.user._id ? req.user._id : req.body.user;
  const portfolio = new PortfolioModel({
    user_id,
    holdings: req.body.stocks,
  });
  try {
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { user_id },
      { user_id, holdings: req.body.stocks },
      { new: true, upsert: true }
    );
    res.send(updatedPortfolio);
  } catch (error) {
    res.status(500).send(error);
  }
});

//switched to post so user id is secure
app.post('/fetch', isAuthorized, async (req, res) => {
  const user_id = req.user._id ? req.user._id : req.query.user_id;
  try {
    const portfolio = await PortfolioModel.findOne({ user_id });
    res.send(portfolio);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;
