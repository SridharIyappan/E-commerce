import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import errorMiddleWare from "./Middleware/error.js";
import {connectDb} from "./Middleware/dbConnection.js";

import userRouter from './Routes/userRoutes.js';
import productRouter from './Routes/productRoutes.js';
import orderRouter from './Routes/orderRoutes.js';


// ENV Config
dotenv.config();

// DB Connection
connectDb();

// Initialize Port Number
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json({extended: true}));
app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use(errorMiddleWare);

// Server Listen
app.listen(port, () =>
  console.log(
    `http://localhost:${port}, on ${process.env.NODE_ENV} mode`
  )
);
