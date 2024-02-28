export type UserModel = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

export type UserResponseModel = {
  id?: string;
  nome: string;
  email: string;
  cpf: string;
};
