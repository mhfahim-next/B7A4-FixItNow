import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";


const createReviewInDB = async (payload: IReview, userId: string) => {

 const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId,
    },
    include: {
      service: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }
console.log("Booking:", booking.customerId, "User ID:", userId);
  if (booking.customerId !== userId) {
    throw new Error("You are not authorized to review this booking");
  }
  console.log("Booking status:", booking.status);
  if (booking.status !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }

  return prisma.review.create({
    data: {
      bookingId: payload.bookingId,
      customerId: userId,
      technicianId: booking.service.technicianId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
};

const getServiceReviewsFromDB = async (serviceId: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return prisma.review.findMany({
    where: {
      booking: {
        serviceId,
      },
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      booking: {
        select: {
          id: true,
          serviceId: true,
          service: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMyReviewsFromDB = async (userId: string) => {
  return prisma.review.findMany({
    where: {
      customerId: userId,
    },

    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const ReviewService = {
  createReviewInDB,
  getServiceReviewsFromDB,
  getMyReviewsFromDB,
};

// export const ReviewService = {
//   createReviewInDB,
// };