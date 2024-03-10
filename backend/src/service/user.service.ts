import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helper/api.error";
import { IUser, User } from "../models/user.model";
import { UserModel } from "../types/type";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import paymentService from "./payment.service";

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UserService {
  getById(userId: string) {
    this.checkUserExists(userId);
    return UserRepository.getById(userId);
  }
  getByEmail(email: string) {
    return UserRepository.getByEmail(email);
  }

  async create(user: UserModel) {
    const userAvailable = await UserRepository.getByEmail(user.email);

    if (userAvailable) {
      throw new BadRequestError("Email já possui cadastro!");
    }

    if (user.senha) {
      user.senha = await bcrypt.hash(user.senha, 10);
    }

    const id = await paymentService.createCustomer(user.email).catch()

    const userEntity: IUser = { ...user, customerId: id };

    return await UserRepository.create(userEntity);
  }

  async authorization(email: string, senha: string) {
    const user = await UserRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const authentication = await bcrypt.compare(senha, user.senha);

    if (!authentication) {
      throw new UnauthorizedError("Authentication failed!");
    }

    const token = jwt.sign({ _id: user.id, email: user.email }, secretJWT, {
      expiresIn: "1h",
    })

    return {
      token,
      user: {
        id: user._id.toString(),
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        customerId: user?.customerId,
        endereco: user?.endereco
      }
    }
  }

  async update(userId: string, user: Partial<typeof User>) {
    this.checkUserExists(userId);
    const userUpdated = await UserRepository.update(userId, user);
    return userUpdated;
  }

  delete(userId: string) {
    return UserRepository.delete(userId);
  }

  private async checkUserExists(userId: string) {
    const existingUser = await UserRepository.getById(userId);
    if (!existingUser) {
      throw new NotFoundError("User not found!");
    }
  }
}

export default new UserService();
