import { Model } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IRole = 'admin';

export type IName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  _id: string;
  email: string;
  password: string;
  name: string;
};

// static methods
/* eslint-disable no-unused-vars */
export type IAdminMethods = {
  isExist(
    email: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'email' | 'name'> | null>;
  isExistById(
    _id: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'name'> | null>;
  isPasswordMatched(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
