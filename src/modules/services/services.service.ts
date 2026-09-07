import { prisma } from "../../lib/prisma";
import { IService } from "./services.interface";


const createService = async (payload: IService, userId: string) => {
  // const userId =  payload.userId;
  console.log(userId)
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });
  if (!technician) {
    throw new Error("Technician profile not found");
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