import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IReview } from './review.interface';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';
import { IPost } from '../post/post.interface';

const createReview = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const { review } = req.body;
    const user = req.user;
    const id: Types.ObjectId = new Types.ObjectId();

    const newReview: IReview = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _id: id,
      reviewedBy: user?._id,
      review,
    };
    const result: IPost | null = await ReviewService.createReview(
      bookId,
      newReview
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Review posted successfully !',
      data: result,
    });
  }
);

export const ReviewController = {
  createReview,
};
