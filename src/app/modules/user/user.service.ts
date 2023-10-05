import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

const createUserIntoDb = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) throw new ApiError(400, 'Failed to create user.');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createdUser.password = undefined;
  return createdUser;
};

export const UserService = {
  createUserIntoDb,
};
