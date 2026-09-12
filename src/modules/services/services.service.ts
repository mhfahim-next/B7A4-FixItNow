import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { IService } from "./services.interface";
import httpStatus  from "http-status";

const createService = async (payload: IService, userId: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });
  if (!technician) {
    throw new AppError(httpStatus.NOT_FOUND, "Technician profile not found");
  }
  const result = await prisma.service.create({
    data: {
      name: payload.name,
      categoryId : payload.categoryId,
      description: payload.description,
      price: payload.price,
      technicianId: technician.id,
    },
  });


  return result;
};


const getAllServices = async () => {
  const result = await prisma.service.findMany({
    include: {
      category: true,
      technician: {
        include: {
          user:{
            omit:{
              password:true
            }
          }

        },
      },


    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


export const servicesService = {
    createService,
    getAllServices,
};