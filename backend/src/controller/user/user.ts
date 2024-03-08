import { UserModel, UserResponseModel } from "./../../types/type";
import { Request, Response } from "express";
import UserService from "../../service/user.service";
import { BadRequestError, NotFoundError } from "../../helper/api.error";

export const registerUser = async (req: Request, res: Response) => {
  const user: UserModel = { ...req.body };

  const userCreated = await UserService.create(user);

  const response: UserResponseModel = {
    id: userCreated._id.toString(),
    nome: userCreated.nome,
    email: userCreated.email,
    cpf: userCreated.cpf,
  };

  res.status(201).json({
    status: res.statusCode,
    message: "Created user!",
    data: { ...response },
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserService.getById(userId);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const response: UserResponseModel = {
    id: user._id.toString(),
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
  };

  res.status(200).json({
    status: res.statusCode,
    data: { ...response },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    throw new BadRequestError("Por favor insira email e senha válidos!");
  }

  const token = await UserService.authorization(email, senha);

  res.status(200).json({
    status: res.statusCode,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserService.update(userId, req.body);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const response: UserResponseModel = {
    id: user._id.toString(),
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
  };

  res.status(200).json({
    status: res.statusCode,
    data: {
      ...response,
    },
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await UserService.delete(userId);

  res.status(200).json({
    status: res.statusCode,
    message: "Deleted user!",
  });
};
