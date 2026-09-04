import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/seandResponse";
import httpStatus from "http-status";
import { servicesService } from "./services.service";


const createService = catchAsync(async (req: Request, res: Response) => {

    
  const result = await servicesService.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});


const getAllServices = catchAsync(
  async (req: Request, res: Response) => {
    const result = await servicesService.getAllServices();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services retrieved successfully",
      data: result,
    });
  }
);

export const serviceController = {
  createService,
  getAllServices,
//   getSingleService,
//   updateService,
//   deleteService,
};