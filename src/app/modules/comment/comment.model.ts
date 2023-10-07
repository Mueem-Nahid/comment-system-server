import { model, Schema } from 'mongoose';
import { IComment, CommentModel } from './comment.interface';

export const commentSchema = new Schema<IComment>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Comment: CommentModel = model<IComment, CommentModel>(
  'Comment',
  commentSchema
);
