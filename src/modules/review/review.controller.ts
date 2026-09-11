import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/seandResponse";
import { ReviewService } from "./review.service";


const createReview = catchAsync(async (req: Request, res: Response) => {
  // Implementation for creating a review
  const result = await ReviewService.createReviewInDB(req.body, req.user?.id as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await ReviewService.getMyReviewsFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My reviews retrieved successfully",
    data: result,
  });
});

const getReviewsByService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const result = await ReviewService.getServiceReviewsFromDB(serviceId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service reviews retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getMyReviews,
  getReviewsByService,
};