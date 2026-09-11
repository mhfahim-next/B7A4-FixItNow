import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/seandResponse";
import { AdminService } from "./admin.service";


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {   

    const updatedUser = await AdminService.updateUserStatusInDB(req.params.id as string, req.body);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User status updated successfully",
        data: updatedUser,
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });   
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getSingleBookingFromDB(req.params.id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking retrieved successfully",
        data: result,
    });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const updatedBooking = await AdminService.updateBookingStatusInDB(req.params.id as string, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking status updated successfully",
        data: updatedBooking,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllCategoriesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All categories retrieved successfully",
    data: result,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createCategoryInDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getSingleCategoryFromDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const updatedCategory = await AdminService.updateCategoryInDB(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const deletedCategory = await AdminService.deleteCategoryFromDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: deletedCategory,
  });
});



export const AdminController = {
  getAllUsers,
  updateUserStatus,
    getAllBookings,
    getSingleBooking,
    updateBookingStatus,
    getAllCategories,
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};