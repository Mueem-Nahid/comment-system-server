import { model, ObjectId, Schema } from 'mongoose';
import { PostModel, IPost } from './post.interface';
import { reviewSchema } from '../review/review.model';

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
    reviews: [reviewSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true }
);

// Add a method to increment the like count
postSchema.methods.likePost = async function (userId: ObjectId) {
  if (!this.likes.find(like => like.user.equals(userId))) {
    this.likes.push({ user: userId });
    this.totalLikes += 1; // Increment the total likes count
    await this.save();
  }
  return this.totalLikes;
};

// Add a method to increment the dislike count
postSchema.methods.dislikePost = async function (userId: ObjectId) {
  if (!this.dislikes.find(dislike => dislike.user.equals(userId))) {
    this.dislikes.push({ user: userId });
    this.totalDislikes += 1; // Increment the total dislikes count
    await this.save();
  }
  return this.totalDislikes;
};

export const Post = model<IPost, PostModel>('Post', postSchema);
