import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { PostController } from './post.controller';
import { PostValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReviewController } from '../review/review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(PostValidation.createPostZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  PostController.createBook
);

router.post(
  '/:bookId/reviews',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  ReviewController.createReview
);

router.get('/:id', PostController.getABook);

router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), PostController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), PostController.deleteBook);

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  PostController.getAllBooks
);

export const PostRoutes = router;
