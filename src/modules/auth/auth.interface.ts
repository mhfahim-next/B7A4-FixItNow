export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN" |"ADMIN";
}
export type TJwtPayload = {
  id: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
}| undefined;