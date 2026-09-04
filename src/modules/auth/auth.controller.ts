import { NextFunction, Request, Response } from "express";
import httpStatus  from "http-status";
import {catchAsync} from "../../utils/catchAsync";
// import {sendResponse} from "../../utils/sendResponse";
import sendResponse from "../../utils/seandResponse";
import { AuthService } from "./auth.service";
// import { sendResponse } from "../../utils/seandResponse";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken }= await AuthService.loginUserIntoDB(req.body);
  res.cookie("accessToken", accessToken,{
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "none",
        maxAge:  24 *60 * 60 * 1000, // 1 day minutes
    })

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "none",
        maxAge:  7 * 24 *60 * 60 * 1000, // 7 day minutes
    } )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMeFromDB(req.user?.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile Retrieved Successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  getMe,
//   refreshTokenController
};