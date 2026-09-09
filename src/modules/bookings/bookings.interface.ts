export interface IBookingCreate {
    serviceId: string;
    bookingDate: Date;
    timeSlot: string;
    address: string;
    note?: string;
  }
  
  export interface IBooking {
    id: string;
    userId: string;
    serviceId: string;
    technicianId: string;
    bookingDate: Date;
    bookingTime: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IBookingUpdate {
    bookingDate?: Date;
    bookingTime?: string;
    status?: string;
  }