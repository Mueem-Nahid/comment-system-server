import { IAdmin } from './admin.interface';
import ApiError from '../../../errors/ApiError';
import { Admin } from './admin.model';
import httpStatus from 'http-status';
import { hashPassword } from '../../../helpers/hashPassword';

const createAdminIntoDb = async (adminData: IAdmin): Promise<IAdmin | null> => {
  const createdUser = await Admin.create(adminData);
  if (!createdUser) throw new ApiError(400, 'Failed to create admin.');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createdUser.password = undefined;
  return createdUser;
};

const getMyProfile = async (id: string): Promise<IAdmin | null> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Admin.findOne({ _id: id }).select('name email');
};

const updateMyProfile = async (userId: string, payload: Partial<IAdmin>) => {
  const isExist = await Admin.findOne({ _id: userId });
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');

  // eslint-disable-next-line no-unused-vars
  const { name, email, password, ...otherData } = payload;

  let hashedPassword;
  if (password) hashedPassword = await hashPassword.encryptPassword(password);

  const updatedUserData: Partial<IAdmin> = {
    ...otherData,
    password: hashedPassword,
  };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  return Admin.findOneAndUpdate({ _id: userId }, updatedUserData, {
    new: true,
    projection: { name: 1, _id: 1, email: 1 },
  });
};

export const AdminService = {
  createAdminIntoDb,
  getMyProfile,
  updateMyProfile,
};
