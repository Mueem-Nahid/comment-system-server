export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserInfo = {
  email: string;
  name: string;
};

export type IUserLoginResponse = {
  userInfo: IUserInfo;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
