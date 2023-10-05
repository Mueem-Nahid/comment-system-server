import { model, Schema } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

export const reviewSchema = new Schema<IReview>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
