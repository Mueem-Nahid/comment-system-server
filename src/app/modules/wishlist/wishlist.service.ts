import { Wishlist } from './wishlist.model';
import { IWishlist } from './wishlist.interface';

const addToWishlist = async (
  bookId: string,
  userId: string
): Promise<IWishlist | null> => {
  const existingWishlist = await Wishlist.findOne({
    book: bookId,
    user: userId,
  });
  if (existingWishlist) {
    await Wishlist.deleteOne({ book: bookId, user: userId });
    return null; // Return null to indicate the post is removed from the wishlist
  } else {
    return await Wishlist.create({ book: bookId, user: userId });
  }
};

const getAllWishlist = async (userId: string): Promise<IWishlist[] | null> => {
  return await Wishlist.find({ user: userId }).populate('book').lean().exec();
};

const getUserWishlist = async (user: string) => {
  return Wishlist.find({ user: user }).select('book');
};

export const WishlistService = {
  addToWishlist,
  getAllWishlist,
  getUserWishlist,
};
