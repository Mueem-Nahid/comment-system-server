import { Model, ObjectId } from 'mongoose';

export type IComment = {
  _id: ObjectId;
  commentedBy: ObjectId;
  comment?: string;
  isLiked: boolean;
};

export type CommentModel = Model<IComment, Record<string, unknown>>;
