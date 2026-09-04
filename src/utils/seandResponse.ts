import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,

  });
};

export default sendResponse;
// import { Response } from "express";

// type TMeta = {
//     page: number;
//     limit: number;
//     total: number;
// }

// type TResponseData<T> = {
//     success: boolean;
//     statusCode: number;
//     message: string;
//     data?: T;
//     meta?: TMeta;
// };
// export const sendResponse= <T>(res: Response, data: TResponseData<T>) => {
//     res.status(data.statusCode).json({
//         success: data.success,
//         statusCode: data.statusCode,
//         message: data.message,
//         data: data.data,
//         meta: data.meta 
//     });
// };