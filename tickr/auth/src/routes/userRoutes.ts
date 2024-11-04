import express, { Request, Response, NextFunction } from "express";
import {
  getUsers,
  login,
  logout,
  register,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// export const register = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { username, email, password } = req.body;

//   // Validate user input
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "Please fill all fields." });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser: userType | null = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User<userType>({
//       name: username,
//       email: email,
//       password: hashedPassword,
//     }).save();

//     return res
//       .status(201)
//       .json({ message: "User registered successfully!", data: newUser });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
router.get("/api/auth/users", authenticateToken, getUsers);

export default router;
