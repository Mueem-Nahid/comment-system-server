import { Model, ObjectId } from 'mongoose';

export type IReview = {
  _id: ObjectId;
  reviewedBy: ObjectId;
  review: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
