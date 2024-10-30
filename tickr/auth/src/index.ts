import express from "express";

const app = express();
app.use(express.json());

const port: Number = 4000;

app.listen(port, () => {
  console.log("Auth service is running on port ==>", port);
});
