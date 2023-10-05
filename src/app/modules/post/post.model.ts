import { model, Schema } from 'mongoose';
import { PostModel, IPost } from './post.interface';
import { reviewSchema } from '../review/review.model';

const postSchema = new Schema<IPost>(
  {
    post: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    reviews: [reviewSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Post = model<IPost, PostModel>('Post', postSchema);
