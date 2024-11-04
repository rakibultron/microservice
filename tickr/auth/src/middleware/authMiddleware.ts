import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "shikret"; // Ensure your secret is set properly

interface CustomRequest extends Request {
  user?: JwtPayload;
}

// Middleware to authenticate tokens
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> | any => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      // If verification fails, return a 403 response
      return res.status(403).json({ message: "Invalid token." });
    }

    // Attach user information to the request object
    req.user = decoded;

    next();
  });
};
