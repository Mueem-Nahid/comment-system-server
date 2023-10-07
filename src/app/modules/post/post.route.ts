import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { PostController } from './post.controller';
import { PostValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CommentController } from '../comment/comment.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(PostValidation.createPostZodSchema),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PostController.createPost
);

router.post(
  '/:postId/comments',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  CommentController.createComment
);

router.post(
  '/:postId/reaction',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PostController.reactToPost
);

router.get('/:id', PostController.getAPost);

router.patch('/:id', auth(ENUM_USER_ROLE.USER), PostController.updatePost);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), PostController.deletePost);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PostController.getAllPosts
);

export const PostRoutes = router;
