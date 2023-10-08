import { model, Schema } from 'mongoose';
import { PostModel, IPost } from './post.interface';
import { commentSchema } from '../comment/comment.model';

const postSchema = new Schema<IPost>(
  {
    post: { type: String, required: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    dislikes: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalLikes: { type: Number, default: 0 },
    totalDislikes: { type: Number, default: 0 },
    comments: [commentSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Post: PostModel = model<IPost, PostModel>('Post', postSchema);
