import { prisma } from "../../lib/prisma";
import { ITechnicianProfile } from "./technician.interface";
import httpStatus from "http-status";

const getAllTechnician = async () => {
  const result = await prisma.technicianProfile.findMany()
  return result;

}

// const createTechnicianProfile = async (payload: ITechnicianProfile) => {
    
//   const isExist = await prisma.technicianProfile.findUnique({
//     where: {
//       userId: payload.userId,
//     },
//   });

//   if (isExist) {
//     throw new Error("Technician profile already exists");
//   }

//   const result = await prisma.technicianProfile.create({
//     data: payload,
//   });
//   return result;
// };

export const technicianService = {
  // createTechnicianProfile,
  getAllTechnician
};