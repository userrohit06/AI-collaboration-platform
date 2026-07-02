import { User } from "../models/user.model";
import { IUser, UserDocument } from "../types/user.types";
import { Query, QueryFilter } from "mongoose";

class UserRepository {
  async create(userData: Partial<IUser>): Promise<UserDocument> {
    const user = await User.create(userData);
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await User.findOne({ email });
    return user;
  }

  async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
    const user = await User.findOne({ email }).select("+password");
    return user;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await User.findById(id);
    return user;
  }

  async exists(filter: QueryFilter<IUser>): Promise<boolean> {
    const user = await User.exists(filter);
    return !!user;
  }

  async save(user: UserDocument): Promise<UserDocument> {
    return await user.save();
  }
}

export const userRepository = new UserRepository();
