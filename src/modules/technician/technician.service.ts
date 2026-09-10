import { prisma } from "../../lib/prisma";
import { ITechnicianProfile } from "./technician.interface";
import httpStatus from "http-status";

const getAllTechnician = async () => {
  const result = await prisma.technicianProfile.findMany()
  return result;

}

const getATechnicianProfileFromDB = async (id: string) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
     id: id,
    },
  });

  if (!result) {
    throw new Error("Technician profile not found");
  }

  return result;
};


const updateTechnicianProfile = async (id: string, payload: ITechnicianProfile) => {

  const isExist = await prisma.technicianProfile.findUnique({
    where: {
      userId: id,
    },
  });

  if (!isExist) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.technicianProfile.update({
    where: {
      userId: id,
    },
    data: payload,
  });

  return result;
};


const updateAvailability = async (id: string, availability: boolean) => {

  const isExist = await prisma.technicianProfile.findUnique({
    where: {
      userId: id,
    },
  });

  if (!isExist) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.technicianProfile.update({
    where: {
      userId: id,
    },
    data: {
      availability: availability,
    },
  });

  return result;
};

const getTechnicianBookingsFromDB = async (id: string) => {
  
  console.log("id", id)

  const findTechnician = await prisma.technicianProfile.findUnique({
    where: {
      userId: id,
    },
  });

  if (!findTechnician) {
    throw new Error("Technician profile not found in bookings");
  }

  const result = await prisma.booking.findMany({
    where: {
      technicianId: findTechnician.id,
    },
  });
  return result;
};

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
  getAllTechnician,
  getATechnicianProfileFromDB,
  updateTechnicianProfile,
  updateAvailability,
  getTechnicianBookingsFromDB,
};