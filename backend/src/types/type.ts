export type UserModel = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

export type UserResponseModel = {
  id: string;
  nome?: string;
  email: string;
  cpf?: string;
};

export type AddressModel = {
  cep: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};
