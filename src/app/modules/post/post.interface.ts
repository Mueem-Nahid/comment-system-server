import mongoose, { Model, ObjectId } from 'mongoose';
import { IReview } from '../review/review.interface';

export type IPost = {
  _id?: ObjectId;
  post: string;
  likes: ObjectId[];
  dislikes: ObjectId[];
  totalLikes: number;
  totalDislikes: number;
  reviews: IReview[];
  user: mongoose.Types.ObjectId;
  toObject(): any;
};

export type IPostFilter = {
  searchTerm?: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;
