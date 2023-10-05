import mongoose, { Model, ObjectId } from 'mongoose';
import { IReview } from '../review/review.interface';

export type IPost = {
  _id?: ObjectId;
  post: string;
  likes: number;
  dislikes: number;
  reviews: IReview[];
  user: mongoose.Types.ObjectId;
  toObject(): any;
};

export type IPostFilter = {
  searchTerm?: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;
