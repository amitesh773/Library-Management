import type { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken"
import { credentials } from "../config/credentials.js";

export interface authRequest extends Request {
  user?: {
    id: number;
    email: string;
    phone: string;
    role: string;
    status: string;
  }
}

export const verifytoken = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token is required"
    })
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    return res.status(400).json({
      message: "Token is required..!!"
    })
  }
  try {
    const decoded = JWT.verify(
      token,
      credentials.JWT_SECRET
    )as {
      id: number,
      email: string,
      phone: string,
      role: string,
      status: string
    
    }
    req.user = decoded;
    next()
    
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid Token"
    })
  }
}