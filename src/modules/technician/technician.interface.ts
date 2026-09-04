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
}

export interface IAvailability {
 [ day: string] :any;
  startTime: string;
  endTime: string;
}
