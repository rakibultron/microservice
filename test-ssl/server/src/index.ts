import express from "express";
import { Request, Response } from "express";
import https from "https";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cookieParser());
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["tickr.dev"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    // exposedHeaders: ["Content-Length", "X-Knowledge"], // Expose specific headers
    credentials: true, // Allow credentials
    maxAge: 3600, // Cache preflight response for 1 hour
    optionsSuccessStatus: 204, // Use 204 for successful OPTIONS requests
  })
);

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Middleware to log received requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(userRoutes);

const port: Number = 4000;

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
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
app.get("/", (req, res) => {
  res.json("Running");
});

app.listen(port, () => {
  dbConnect();
  console.log("Auth service is running on port ==>", port);
});
