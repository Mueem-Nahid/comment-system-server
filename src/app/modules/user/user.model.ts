import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { hashPassword } from '../../../helpers/hashPassword';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// instance method
userSchema.methods.isExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'name'> | null> {
  return User.findOne(
    { email },
    { _id: 1, password: 1, email: 1, name: 1 }
  ).lean();
};

userSchema.methods.isExistById = async function (
  _id: string
): Promise<Pick<IUser, '_id' | 'password' | 'email' | 'name'> | null> {
  return User.findOne(
    { _id },
    { _id: 1, password: 1, email: 1, name: 1 }
  ).lean();
};

userSchema.methods.isPasswordMatched = async function (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> {
  return hashPassword.decryptPassword(enteredPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await hashPassword.encryptPassword(this.password);
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
