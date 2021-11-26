import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//check
const date = new Date();
const cDate = date.getDate() + 3;
const cMonth = date.getMonth() + 1;
const cYear = date.getFullYear() + 2;

app.use(cors());

app.listen(port, () =>
  console.log(`http://localhost:${port}, ${process.env.PORT}, ${new Date(cYear, cMonth, cDate)}`)
);
