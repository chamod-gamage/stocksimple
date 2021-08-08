import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.ObjectId,
    required: true,
    index: { unique: true },
  },
  holdings: [
    {
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      shares: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
