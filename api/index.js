import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to mongo db !!');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

const app = express();

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
