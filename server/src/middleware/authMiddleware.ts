import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "No Token"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }
};

export default protect;