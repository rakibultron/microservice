import { Request, Response } from "express";
import User, { IUser, userType } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shikret";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  // Validate user input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    // Check if the user already exists
    const existingUser: userType | null = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists.", data: existingUser });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await new User<userType>({
      name: username,
      email: email,
      password: hashedPassword,
    }).save();

    return res
      .status(201)
      .json({ message: "User registered successfully!", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    console.log({ email, password });
    // Find the user by email
    const user = await User.findOne({ email }).exec();

    console.log({ user });
    // if (user != null) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Store the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

// Logout user
export const logout = async (_req: Request, res: Response): Promise<any> => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

// Protected route example to get all users (use this for routes that need authentication)
export const getUsers = async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
