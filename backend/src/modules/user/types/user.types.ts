import { HydratedDocument, Model } from "mongoose";
import { UserStatus } from "../../../shared/constants/user.constants";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  status: UserStatus;
  lastSeen?: Date;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

export interface UserModel extends Model<IUser, {}, IUserMethods> {}
