import { Model } from 'mongoose';

export type IUserRole = 'seller' | 'buyer';

export type IUser = {
  _id: string;
  email: string;
  password: string;
  name: string;
};

// static methods
/* eslint-disable no-unused-vars */
export type IUserMethods = {
  isExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'name'> | null>;
  isExistById(
    _id: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'name'> | null>;
  isPasswordMatched(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
