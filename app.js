import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import {connectDb} from "./Middleware/dbConnection.js";

import userRouter from './Routes/userRoutes.js'

// ENV Config
dotenv.config();

// DB Connection
connectDb();

// Initialize Port Number
const port = process.env.PORT || 3001;

//check start
const date = new Date();
const cDate = date.getDate() + 3;
const cMonth = date.getMonth() + 1;
const cYear = date.getFullYear() + 2;
//check end

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json({extended: true}));

app.use('/api', userRouter);

// Server Listen
app.listen(port, () =>
  console.log(
    `http://localhost:${port}, env port ${process.env.PORT}`
  )
);
