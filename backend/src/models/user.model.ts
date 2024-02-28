import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    senha: {
      type: String,
      required: [true, "Senha is a required field"],
    },
    nome: {
      type: String,
      required: [true, "Nome is a required field"],
    },
    cpf: {
      type: String,
      required: [true, "CPF is a required field"],
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
