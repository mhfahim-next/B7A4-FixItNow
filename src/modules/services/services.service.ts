import { prisma } from "../../lib/prisma";
import { IService } from "./services.interface";


const createService = async (payload: IService) => {

  const result = await prisma.service.create({
    data: payload,
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