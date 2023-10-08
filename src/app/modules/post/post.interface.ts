import mongoose, { Model, ObjectId } from 'mongoose';
import { IComment } from '../comment/comment.interface';

export type IPost = {
  _id?: ObjectId;
  post: string;
  likes: ObjectId[];
  dislikes: ObjectId[];
  totalLikes: number;
  totalDislikes: number;
  comments: IComment[];
  user: mongoose.Types.ObjectId;
  toObject(): any;
};

export type IPostFilter = {
  searchTerm?: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;
