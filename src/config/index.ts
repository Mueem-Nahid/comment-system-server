import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_income: process.env.DEFAULT_USER_INCOME,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_expired_time: process.env.JWT_EXPIRED_TIME,
    jwt_refresh_token_expired_time: process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME,
  },
};
