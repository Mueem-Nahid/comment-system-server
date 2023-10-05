import { IPost, IPostFilter } from './post.interface';
import { Post } from './post.model';
import ApiError from '../../../errors/ApiError';
import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { postSearchableFields } from './post.constant';

const createBook = async (
  bookData: IPost,
  userEmail: string
): Promise<IPost | null> => {
  const user = new User();
  if (
    !(await user.isExist(userEmail)) ||
    !(await user.isExistById(bookData.user.toString()))
  )
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const createdBook = Post.create(bookData);
  if (!createdBook) throw new ApiError(400, 'Failed to create post.');
  return createdBook;
};

const getAllBooks = async (
  filters: IPostFilter,
  paginationOption: IPaginationOptions
): Promise<IGenericResponsePagination<IPost[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  // const { searchTerm, ...filtersData } = filters;
  const { searchTerm, ...otherFilters } = filters;
  const andConditions = [];

  // making implicit and
  if (searchTerm) {
    andConditions.push({
      $or: postSearchableFields.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(otherFilters).length) {
    // Exclude publicationDate from otherFilters
    if (Object.keys(otherFilters).length > 1) {
      andConditions.push({
        $and: Object.entries(otherFilters).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Post.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total: number = await Post.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getABook = async (id: string): Promise<IPost | null> => {
  return Post.findById(id).populate('reviews.reviewedBy', 'name', 'User');
};

const updateBook = async (
  id: string,
  payload: Partial<IPost>,
  userId: string
): Promise<IPost | null> => {
  return Post.findOneAndUpdate({ _id: id, user: userId }, payload, {
    new: true,
  });
};

const deleteBook = async (id: string, user: string): Promise<IPost | null> => {
  return Post.findOneAndDelete({ _id: id, user });
};

export const PostService = {
  createBook,
  getAllBooks,
  getABook,
  updateBook,
  deleteBook,
};
