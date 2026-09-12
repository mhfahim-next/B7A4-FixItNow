import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { IBookingCreate } from "./bookings.interface";
import httpStatus  from "http-status";

const addBookingInDB = async (bookingData: IBookingCreate, customerId: string) => {

  const service = await prisma.service.findUnique({
    where: {
      id: bookingData.serviceId,
    },
    include: {
      technician: true,
    },
  });

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    // throw new Error("Service not found");
  }

  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: service.technicianId,
    },
  });

  if (!technician?.availability) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Technician is not available for booking");
    // throw new Error("Technician is not available for booking");
  }

  const booking = await prisma.booking.create({
    data: {
        technicianId: service.technicianId,
      customerId: customerId,
      serviceId: bookingData.serviceId,
      bookingDate: new Date(bookingData.bookingDate),
      timeSlot: bookingData.timeSlot,
      address: bookingData.address,
      note: bookingData.note ?? null,
    },
  });

  return booking;
};

const getUsersBookingsFromDB = async (customerId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      service: true,
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
      service: true,
    },
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    // throw new Error("Booking not found");
  }

  return booking;
};

export const bookingService = {
  addBookingInDB,
  getUsersBookingsFromDB,
    getSingleBookingFromDB,
};