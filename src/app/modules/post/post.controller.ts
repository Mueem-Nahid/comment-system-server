import { Server } from 'socket.io';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PostService } from './post.service';
import { IPost } from './post.interface';
import pick from '../../../shared/pick';
import { filterableFields } from './post.constant';
import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationFields } from '../../../constants/pagination';
import { JwtPayload } from 'jsonwebtoken';
import { getSocketIOInstance } from '../../../socketIOServer';
import config from "../../../config";

const createPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const postData = req.body;
    const userObj: JwtPayload | null = req.user;
    const userEmail = userObj?.email;
    const result: IPost | null = await PostService.createPost(
      postData,
      userEmail
    );

    // Get the Socket.io instance. Vercel does not support socket io.
     if(config.env !== 'production') {
        const io: Server = getSocketIOInstance();
        // Emit a socket event to notify clients about the new post
        io.emit('newPost', result);
     }

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Post created successfully !',
      data: result,
    });
  }
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const userObj: JwtPayload | null = req.user;
    const userId = userObj?._id;

    const result: IGenericResponsePagination<IPost[]> =
      await PostService.getAllPosts(filters, paginationOptions);

    sendResponse<IPost[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posts are retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getAPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result: IPost | null = await PostService.getAPost(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post',
      data: result,
    });
  }
);

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result: IPost | null = await PostService.updatePost(id, data, userId);
  if (!result)
    sendResponse<IPost>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Post not updated. No post is available to update.',
    });
  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated !',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result = await PostService.deletePost(id, userId);
  if (!result)
    sendResponse<IPost>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Post not deleted. No post is available to delete.',
    });
  sendResponse<IPost>(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Post deleted !',
  });
});

const reactToPost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = req.user;
  const { isLiked } = req.body;
  const result = await PostService.reactToPost(postId, user?._id, isLiked);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Failed.',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Ok',
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getAPost,
  updatePost,
  deletePost,
  reactToPost,
};
