import { Model, Types } from 'mongoose';

export type IWishlist = {
  book: Types.ObjectId;
  user: Types.ObjectId;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
