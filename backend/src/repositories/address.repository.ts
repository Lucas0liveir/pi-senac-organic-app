import { NotFoundError } from "../helper/api.error";
import { AddressModel } from "../types/type";
import { IUser, User } from "./../models/user.model";

class AddressRepository {
  async insert(userId: string, endereco: AddressModel) {
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw new NotFoundError("Usuário não encontrado");
    }
    userToUpdate.endereco = endereco;
    userToUpdate.save();
    const userResponse = await User.findById(userId);
    return userResponse;
  }

  async update(userId: string, user: Partial<typeof User>) {
    return await User.findByIdAndUpdate(userId, user);
  }

  delete(userId: string) {
    return User.findByIdAndDelete(userId);
  }
}

export default new AddressRepository();
