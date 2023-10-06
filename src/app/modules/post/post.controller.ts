import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PostService } from './post.service';
import { IPost } from './post.interface';
import pick from '../../../shared/pick';
import { filterableFields } from './post.constant';
import { IPaginationOptions } from '../../../interfaces/common';
import { paginationFields } from '../../../constants/pagination';
import { JwtPayload } from 'jsonwebtoken';
import { WishlistService } from '../wishlist/wishlist.service';

const createBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const bookData = req.body;
    const userObj: JwtPayload | null = req.user;
    const userEmail = userObj?.email;
    const result: IPost | null = await PostService.createBook(
      bookData,
      userEmail
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book created successfully !',
      data: result,
    });
  }
);

const getAllBooks = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const userObj: JwtPayload | null = req.user;
    const userId = userObj?._id;

    const result = await PostService.getAllBooks(filters, paginationOptions);

    if (userId) {
      const wishlist = await WishlistService.getUserWishlist(userId);
      // Create a set of post ids in the wishlist for faster lookup
      const wishlistSet = new Set(wishlist.map(item => item.book.toString()));

      // Convert each Book document to a plain JavaScript object and add the isWishlisted property

      result.data = result.data.map((book: IPost) => ({
        ...book?.toObject(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isWishlisted: wishlistSet.has(book?._id.toString()),
      }));
    }

    sendResponse<IPost[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books are retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getABook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result: IPost | null = await PostService.getABook(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book',
      data: result,
    });
  }
);

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result: IPost | null = await PostService.updateBook(id, data, userId);
  if (!result)
    sendResponse<IPost>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not updated. No post is available to update.',
    });
  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result = await PostService.deleteBook(id, userId);
  if (!result)
    sendResponse<IPost>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not deleted. No post is available to delete.',
    });
  sendResponse<IPost>(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Book deleted !',
  });
});

const reactToPost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = req.user;
  const { isLiked } = req.body;
  const result = await PostService.reactToPost(postId, user?._id, isLiked);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Failed.',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Ok',
  });
});

export const PostController = {
  createBook,
  getAllBooks,
  getABook,
  updateBook,
  deleteBook,
  reactToPost,
};
