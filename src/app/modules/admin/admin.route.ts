import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';
import { AuthValidation } from '../auth/auth.validation';
import { AuthController } from '../auth/auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.myProfile
);

router.patch(
  '/my-profile',
  validateRequest(UserValidation.updateMyProfileZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateMyProfile
);

export const AdminRoutes = router;
