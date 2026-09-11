import { prisma } from "../../lib/prisma";
import { IuserStatusUpdate } from "./admin.interface";


const getAllUsersFromDB = async () => {
  // Implementation for fetching all users from the database
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return users; 
};

const updateUserStatusInDB = async (userId: string, payload: any) => {
  // Implementation for updating user status in the database
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status : payload.status,
    },
    omit: {
      password: true,
    },  
  });

  return updatedUser;
};

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      service: {
        select: {
          id: true,
          name: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return bookings;
};

const getSingleBookingFromDB = async (bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            service: {
                select: {
                    id: true,
                    name: true,
                },
            },
            technician: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return booking;
};

const updateBookingStatusInDB = async (bookingId: string, payload: any) => {
    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status : payload.status,
        },
    });

    return updatedBooking;
};

const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const createCategoryInDB = async (payload: any) => {
  const newCategory = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return newCategory;
};

const getSingleCategoryFromDB = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
};

const updateCategoryInDB = async (categoryId: string, payload: any) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return updatedCategory;
};

const deleteCategoryFromDB = async (categoryId: string) => {
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return deletedCategory;
};




export const AdminService = {
    getAllUsersFromDB,
    updateUserStatusInDB,
    getAllBookingsFromDB,
    getSingleBookingFromDB,
    updateBookingStatusInDB,
    getAllCategoriesFromDB,
    createCategoryInDB,
    getSingleCategoryFromDB,
    updateCategoryInDB,
    deleteCategoryFromDB,
};