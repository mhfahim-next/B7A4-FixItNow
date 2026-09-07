export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN" |"ADMIN";
  experience?: number;
  hourlyRate?: number;
  location?: string;
}
export type TJwtPayload = {
  id: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";

}| undefined;