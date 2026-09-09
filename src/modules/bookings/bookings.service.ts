import { prisma } from "../../lib/prisma";
import { IBookingCreate } from "./bookings.interface";

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
    // throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    throw new Error("Service not found");
  }

  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: service.technicianId,
    },
  });

  if (!technician?.availability) {
    throw new Error("Technician is not available for booking");
  }

  const booking = await prisma.booking.create({
    data: {
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

export const bookingService = {
  addBookingInDB,
};