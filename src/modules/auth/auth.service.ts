import bcrypt from "bcryptjs";
import AppError from "../../errors/AppError";
import { IRegisterUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";
import httpStatus  from "http-status";

const registerUserIntoDB = async (payload: IRegisterUser) => {

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },

  });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already exists",
    );
    // throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(payload.password, 10);


  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
      },
    });

    if (payload.role === "TECHNICIAN") {
      await tx.technicianProfile.create({
        data: {
          userId: user.id,
          experience: payload.experience ?? 0,
          hourlyRate: payload.hourlyRate ?? 0,
          location: payload.location ?? "",
          skills: [],
        },
      });
    }

    return user;
  });

  return result;
};

const loginUserIntoDB = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found",
    );
  }
  
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);    

    if (!isPasswordValid) {
      throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "Invalid Password",
    );
    }

  const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };


    // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {expiresIn: config.jwt_access_expires_in } as SignOptions);

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, {expiresIn: config.jwt_access_expires_in } as SignOptions);
    // const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {expiresIn: config.jwt_refresh_expires_in } as SignOptions );
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, {expiresIn: config.jwt_refresh_expires_in } as SignOptions );
    

    return { 
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };

};

const getMeFromDB = async (userId: string) => {
    const userProfile = await prisma.user.findUnique({
        where: {
            id: userId
        },
        omit: {
            password: true
        }
    });

    if (!userProfile) {
      throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found",
    );
    }

    return userProfile;
};

// const getMyProfileFromDB = async (userId : string) => {
//     const user = await prisma.user.findUniqueOrThrow({
//         where : {id : userId},
//         omit : {
//             password : true
//         },
//         include : {
//             profile : true
//         }
//     });

//     return user;
// }

export const AuthService = {
  registerUserIntoDB,
  loginUserIntoDB,
    getMeFromDB,
};
