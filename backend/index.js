import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.use(express.json());

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(router);

app.listen(5555, () => {
  console.log('Server is running on port 5555...');
});
