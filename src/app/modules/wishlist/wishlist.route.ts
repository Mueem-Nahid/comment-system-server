import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { WishlistController } from './wishlist.controller';

const router = express.Router();

router.post(
  '/:bookId',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  WishlistController.addToWishlist
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  WishlistController.getAllWishlistedBooks
);

export const WishlistRoutes = router;
