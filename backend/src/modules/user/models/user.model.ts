import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "../types/user.types";
import { UserStatus } from "../../../shared/constants/user.constants";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.OFFLINE,
      index: true,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// compare entered password with hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// remove sensitive fields from API responses
userSchema.set("toJSON", {
  transform(_doc, ret) {
    const { password, ...user } = ret;
    return user;
  },
});

export const User = model<IUser, UserModel>("User", userSchema);
