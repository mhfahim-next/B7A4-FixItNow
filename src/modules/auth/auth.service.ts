import bcrypt from "bcryptjs";

import { IRegisterUser, TJwtPayload } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

import { JwtPayload, SignOptions } from "jsonwebtoken";

const registerUserIntoDB = async (payload: IRegisterUser) => {

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },

  });

  if (isUserExist) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(payload.password, 10);



  // const result = await prisma.user.create({
  //   data: {
  //     name: payload.name,
  //     email: payload.email,
  //     password: hashedPassword,
  //     role: payload.role,
  //   },
  //   omit: {
  //     password: true
  //   }
  // });

  // if (payload.role === "TECHNICIAN") {
  //   await prisma.technicianProfile.create({
  //     data: {
  //       userId: result.id,
  //       experience: payload.experience ?? 0,
  //       hourlyRate: payload.hourlyRate ?? 0,
  //       location: payload.location ?? "",
  //       skills: [],
  //     },
  //   });
  // }

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
    throw new Error("User not found");
  }
  
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);    

    if (!isPasswordValid) {
      throw new Error("Invalid password");
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
        throw new Error("User not found");
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
