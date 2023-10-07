import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IComment } from './comment.interface';
import { Types } from 'mongoose';
import { CommentService } from './comment.service';
import { IPost } from '../post/post.interface';

const createComment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;
    const { comment } = req.body;
    const user = req.user;
    const id: Types.ObjectId = new Types.ObjectId();

    const newComment: IComment = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _id: id,
      commentedBy: user?._id,
      comment,
    };
    const result: IPost | null = await CommentService.createComment(
      postId,
      newComment
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Review posted successfully !',
      data: result,
    });
  }
);

export const CommentController = {
  createComment,
};
