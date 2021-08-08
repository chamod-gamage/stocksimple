import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
} else {
  app.use(function (req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https'
      ? next()
      : res.redirect('https://' + req.hostname + req.url);
  });
}
const PORT = process.env.PORT || 80;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://compassionate-borg-d2ff90.netlify.app',
    'https://stocksimple.netlify.app',
  ],
};

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB.');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
