import express from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = express.Router();

router.post("/api/auth/users", createUser);
router.get("/api/auth/users", getUsers);

export default router;
