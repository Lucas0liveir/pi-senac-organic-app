import { IUser, User } from "./../models/user.model";

class UserRepository {
  async getById(userId: string) {
    return await User.findById(userId);
  }

  async getByEmail(email: string) {
    return await User.findOne({ email }).select("+senha");
  }

  async create(user: IUser) {
    return await User.create(user);
  }

  async update(userId: string, user: Partial<typeof User>) {
    return await User.findByIdAndUpdate(userId, user);
  }

  delete(userId: string) {
    return User.findByIdAndDelete(userId);
  }
}

export default new UserRepository();
