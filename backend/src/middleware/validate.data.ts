import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helper/api.error";
import { UserModel } from "../types/type";

// Middleware para validar os campos do usuário
export function validateUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user: UserModel = { ...req.body };

  const emptyFields: string[] = [];

  if (!user.email || user.email.trim() === "") {
    emptyFields.push("email");
  }

  if (!user.cpf || user.cpf.trim() === "") {
    emptyFields.push("cpf");
  }

  if (!user.nome || user.nome.trim() === "") {
    emptyFields.push("nome");
  }

  if (!user.senha || user.senha.trim() === "") {
    emptyFields.push("senha");
  }

  if (emptyFields.length > 0) {
    if (emptyFields.length === 1) {
      throw new BadRequestError(`O campo ${emptyFields[0]} é obrigatório`);
    } else {
      throw new BadRequestError(
        `Os campos ${
          emptyFields.slice(0, -1).join(", ") + " e " + emptyFields.slice(-1)
        } são obrigatórios`
      );
    }
  }

  next();
}
