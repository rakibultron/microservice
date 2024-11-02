import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

// Insert a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user: IUser = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
