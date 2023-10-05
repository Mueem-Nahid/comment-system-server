import {
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';

const loginUser = async (
  payload: ILoginUser,
  type: string
): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  let modelInstance;

  if (type === 'admins') {
    modelInstance = new Admin();
  } else {
    modelInstance = new User();
  }
  const isPersonExist:
    | Pick<IUser, 'password' | 'email' | '_id' | 'name'>
    | Pick<IAdmin, 'password' | 'email' | '_id' | 'name'>
    | null = await modelInstance.isExist(email);
  if (!isPersonExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');

  // match password
  if (
    isPersonExist.password &&
    !(await modelInstance.isPasswordMatched(password, isPersonExist.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'ID or password is incorrect.');

  // create access and refresh token
  const accessToken: string = jwtHelper.createToken(
    {
      _id: isPersonExist?._id,
      email: isPersonExist?.email,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expired_time }
  );

  const refreshToken: string = jwtHelper.createToken(
    {
      _id: isPersonExist?._id,
      email: isPersonExist?.email,
    },
    config.jwt.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt.jwt_refresh_token_expired_time }
  );

  const userInfo = {
    id: isPersonExist._id,
    email: isPersonExist.email,
    name: isPersonExist.name,
  };

  return {
    userInfo,
    accessToken,
    refreshToken,
  };
};

const createRefreshToken = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (e) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }
  const { _id } = verifiedToken;

  const user = new User();
  const isUserExist = await user.isExistById(_id);
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');

  const newAccessToken: string = jwtHelper.createToken(
    {
      _id: isUserExist?._id,
      email: isUserExist?.email,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expired_time }
  );

  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  createRefreshToken,
};
