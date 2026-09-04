import { NextFunction, Request, Response} from "express";
import { jwtUtils } from "./../utils/jwt";
import config from "../config";
import httpStatus from "http-status";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role;
            };
        }
    }
}

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken 
        // : req.headers.authorization?.startsWith("Bearer ") ? 
        // req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unauthorized access",
            });
        }

        const verifiedToken = jwtUtils.verifyToken (token, config.jwt_access_secret);
        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }


        const {email, name, id, role} = verifiedToken.data as JwtPayload; // Assuming the payload has these properties
        // const requiredRole = [Role.ADMIN, Role.USER, Role.AUTHOR];
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "Forbidden access",
            });
        }
        const user = await prisma.user.findUnique({


            where: { id, email, name, role }
        })
        if(!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unauthorized access",
            });
        }
        // if(user.activeStatus === "BLOCKED") {
        //     return res.status(httpStatus.FORBIDDEN).json({
        //         success: false,
        //         statusCode: httpStatus.FORBIDDEN,
        //         message: "User is inactive",
        //     });
        // }
        req.user = { email, name, id, role }; // Attach user info to the request object
        next();

    }
    )
}