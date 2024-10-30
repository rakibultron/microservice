import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

const port: Number = 4000;

app.get("/api/auth/users", async (req: Request, res: Response) => {
  res.json({ data: ["Rakib", "Roni", "Raju"] });
});

app.get("/api/auth", async (req, res) => {
  console.log(req.query.id);
  res.json({ hello: "Auth service is running on port `${port}`" });
});

app.listen(port, () => {
  console.log("Auth service is running on port ==>", port);
});
