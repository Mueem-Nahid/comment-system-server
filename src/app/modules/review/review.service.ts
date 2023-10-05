import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Post } from '../post/post.model';
import { IReview } from './review.interface';
import { IPost } from '../post/post.interface';

const createReview = async (
  bookId: string,
  newComment: IReview
): Promise<IPost | null> => {
  const updatedBook = await Post.findOneAndUpdate(
    { _id: bookId },
    { $push: { reviews: newComment } },
    { new: true }
  );
  if (!updatedBook) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  return updatedBook;
};

export const ReviewService = {
  createReview,
};
