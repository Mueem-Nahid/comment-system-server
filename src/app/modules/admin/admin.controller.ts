import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const adminData = req.body;
    const result: IAdmin | null = await AdminService.createAdminIntoDb(
      adminData
    );

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

const myProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    const userId = user?._id;
    const result: IAdmin | null = await AdminService.getMyProfile(userId);
    if (!result)
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Admin not found.',
      });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin',
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?._id;
  const data = req.body;
  const result = await AdminService.updateMyProfile(userId, data);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile has been updated !',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  myProfile,
  updateMyProfile,
};
