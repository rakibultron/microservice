import express from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
router.get("/api/auth/users", authenticateToken, getUsers);

export default router;
