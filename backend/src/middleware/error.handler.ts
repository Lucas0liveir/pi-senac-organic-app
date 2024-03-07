import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../helper";

export const errorMiddleware = (
  error: Error & Partial<ApiError> & ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (
    error.name === "CastError" ||
    error.code === 11000 ||
    error.name === "ValidationError" ||
    error.name === "TokenExpiredError" ||
    error.name === "JsonWebTokenError"
  ) {
    return res.status(400).json({ message: error.message });
  }

  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message });
};
