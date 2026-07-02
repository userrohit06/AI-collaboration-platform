import { IUser, UserDocument } from "../types/user.types";
import { userRepository } from "../repositories/user.repository";

class UserService {
  async createUser(userData: Partial<IUser>): Promise<UserDocument> {
    return await userRepository.create(userData);
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await userRepository.findByEmail(email);
  }

  async getUserByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return await userRepository.findByEmailWithPassword(email);
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return await userRepository.findById(id);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return await userRepository.exists({ email });
  }

  async saveUser(user: UserDocument): Promise<UserDocument> {
    return await userRepository.save(user);
  }
}

export const userService = new UserService();
