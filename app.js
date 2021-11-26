import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'mongoose';
const {NativeDate} = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.listen(port, () =>
  console.log(`http://localhost:${port}, ${process.env.PORT}, ${NativeDate}`)
);
