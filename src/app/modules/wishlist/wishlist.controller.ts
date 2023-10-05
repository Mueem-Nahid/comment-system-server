import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WishlistService } from './wishlist.service';
import { IWishlist } from './wishlist.interface';

const addToWishlist = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const userObj: JwtPayload | null = req.user;
    const userId = userObj?._id;

    const result: IWishlist | null = await WishlistService.addToWishlist(
      bookId,
      userId
    );

    if (!result)
      return sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
      });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book added into wishlist !',
      data: result,
    });
  }
);

const getAllWishlistedBooks = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userObj: JwtPayload | null = req.user;
    const userId = userObj?._id;

    const result: IWishlist[] | null = await WishlistService.getAllWishlist(
      userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Wishlist retrieved.',
      data: result,
    });
  }
);

export const WishlistController = {
  addToWishlist,
  getAllWishlistedBooks,
};
