import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  customerId?: string;
  endereco?: IAddress;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IAddress {
  cep: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const AddressSchema = new Schema<IAddress>(
  {
    cep: String,
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
  },
  { _id: false }
);

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
      select: false,
    },
    nome: {
      type: String,
      required: [true, "Nome is a required field"],
    },
    customerId: {
      type: String,
      required: false,
      unique: true,
    },
    cpf: {
      type: String,
      required: [true, "CPF is a required field"],
      unique: true,
    },
    endereco: AddressSchema,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
