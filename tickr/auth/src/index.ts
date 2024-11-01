import express from "express";
import { Request, Response } from "express";

import mongoose from "mongoose";

const app = express();
app.use(express.json());

const port: Number = 4000;

app.get("/api/auth/users", async (req: Request, res: Response) => {
  res.json({ data: ["Rakib", "Roni", "Raju"] });
});

app.get("/api/auth", async (req, res) => {
  res.json({ hello: "Auth service is running on port `${port}`" });
});

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
  console.log("Auth service is running on port ==>", port);
  dbConnect();
});
