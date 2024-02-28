import { UserModel, UserResponseModel } from "./../../types/type";
import { Request, Response } from "express";
import UserService from "../../service/user.service";
import { BadRequestError } from "../../helper/api.error";

export const registerUser = async (req: Request, res: Response) => {
  const user: UserModel = { ...req.body };

  const emptyFields: String[] = [];

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

  if (emptyFields.length === 1) {
    throw new BadRequestError(`O campo ${emptyFields[0]} é obrigatório`);
  }

  if (emptyFields.length > 1) {
    throw new BadRequestError(
      `Os campos ${
        emptyFields.slice(0, -1).join(", ") + " e " + emptyFields.slice(-1)
      } são obrigatórios`
    );
  }

  const response: UserResponseModel = await UserService.create(user);

  res.status(201).json({
    status: res.statusCode,
    message: "Created user!",
    data: { response },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email) {
    throw new BadRequestError("Email é obrigatório");
  }
  if (!senha) {
    throw new BadRequestError("Email é obrigatório");
  }

  const token = await UserService.authorization(email, senha);

  res.status(200).json({
    status: res.statusCode,
    data: {
      token,
    },
  });
};
