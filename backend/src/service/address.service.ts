import { NotFoundError } from "../helper/api.error";
import { User } from "../models/user.model";
import AddressRepository from "../repositories/address.repository";
import UserRepository from "../repositories/user.repository";
import { AddressModel } from "../types/type";

class AddressService {
  async insertAddress(userId: string, address: AddressModel) {
    return await AddressRepository.insert(userId, address);
  }

  async update(userId: string, user: Partial<typeof User>) {
    this.checkUserExists(userId);
    const userUpdated = await AddressRepository.update(userId, user);
    return userUpdated;
  }

  delete(userId: string) {
    return AddressRepository.delete(userId);
  }

  private async checkUserExists(userId: string) {
    const existingUser = await UserRepository.getById(userId);
    if (!existingUser) {
      throw new NotFoundError("User not found!");
    }
  }
}

export default new AddressService();
