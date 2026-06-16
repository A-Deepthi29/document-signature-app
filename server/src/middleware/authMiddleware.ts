import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "No Token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    console.log("DECODED:", decoded);

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default protect;