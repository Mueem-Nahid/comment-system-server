import { IWishlist, WishlistModel } from './wishlist.interface';
import { model, Schema } from 'mongoose';

const wishlistSchema = new Schema<IWishlist>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  wishlistSchema
);
