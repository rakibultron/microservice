import express, { Request, Response, NextFunction } from "express";
import {
  getUsers,
  login,
  logout,
  register,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
router.get("/api/auth/users", authenticateToken, getUsers);

export default router;
