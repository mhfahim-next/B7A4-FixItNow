import { Request, Response } from "express";
import sendResponse from "../../utils/seandResponse";
import httpStatus from "http-status";
import { bookingService } from "./bookings.service";
import { catchAsync } from "../../utils/catchAsync";


const addBooking = catchAsync(async (req: Request, res: Response) => {

    const result = await bookingService.addBookingInDB(req.body , req.user?.id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Booking added successfully",
        data: result,
    });
});

const getUsersBookings = catchAsync(async (req: Request, res: Response) => {

    const result = await bookingService.getUsersBookingsFromDB(req.user?.id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User's bookings retrieved successfully",
        data: result,
    });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const result = await bookingService.getSingleBookingFromDB(bookingId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking retrieved successfully",
        data: result,
    });
});     

export const bookingController = {
  addBooking,
  getUsersBookings,
  getSingleBooking,
};