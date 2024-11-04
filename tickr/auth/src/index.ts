import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(userRoutes);
const port: Number = 4000;

const dbConnect = async () => {
  try {
    await mongoose.connect(`mongodb://auth-db-cluster-ip`).then(() => {
      console.log("auth-db connected");
    });
  } catch (error) {
    console.error(error);
  }
};

app.listen(port, () => {
  dbConnect();
  console.log("Auth service is running on port ==>", port);
});
