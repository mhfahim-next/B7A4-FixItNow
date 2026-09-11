import { BookingStatus } from "../../../generated/prisma/enums";

export interface ITechnicianProfile {
  userId: string;
  bio?: string;
  experience: number;
  hourlyRate: number;
  location: string;
  averageRating?: number;
}

export interface ITechnicianUpdate {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string;
  skills?: string[];
}

export interface IAvailability {
 [ day: string] :any;
  startTime: string;
  endTime: string;
}

export interface IBookingStatusUpdate {
  status: BookingStatus;
}