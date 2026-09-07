import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/seandResponse";
import { technicianService } from "./technician.service";
import httpStatus from "http-status";


const allTechnician = catchAsync(
  async (req: Request, res: Response ) =>{
    const result = await technicianService.getAllTechnician();

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Technician profile created successfully",
      data: result,
    });
  }
)


// const createTechnicianProfile = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await technicianService.createTechnicianProfile(req.body);

//     sendResponse(res, {
//       statusCode: httpStatus.CREATED,
//       success: true,
//       message: "Technician profile created successfully",
//       data: result,
//     });
//   }
// );

export const technicianController = {
  // createTechnicianProfile,
  allTechnician
}; 