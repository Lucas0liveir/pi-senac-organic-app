import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../helper/api.error";

const secretJWT = process.env.JWT_SECRET_KEY || "";

const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    let authHeader = req.headers["authorization" || "Authorization"];

    if (!authHeader) {
      throw new UnauthorizedError(
        "Usuário não está autorizado ou o token está ausente!"
      );
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedError(
          "Usuário não está autorizado ou o token está ausente!"
        );
      }

      jwt.verify(token, secretJWT, function (err, decoded: any) {
        if (err) {
          throw new UnauthorizedError("Falha na autenticação do usuário.");
        }

        req.body = { ...req.body, user_id_validate: decoded._id };
        next();
      });
    }

    if (!token) {
      throw new UnauthorizedError(
        "Usuário não está autorizado ou o token está ausente"
      );
    }
  }
);

export default validateToken;
