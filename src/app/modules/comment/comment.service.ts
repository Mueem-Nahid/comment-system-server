import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Post } from '../post/post.model';
import { IComment } from './comment.interface';
import { IPost } from '../post/post.interface';

const createComment = async (
  postId: string,
  newComment: IComment
): Promise<IPost | null> => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: newComment } },
    { new: true }
  );
  if (!updatedPost) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  return updatedPost;
};

export const CommentService = {
  createComment,
};
