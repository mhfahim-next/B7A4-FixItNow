import { UserStatus } from "../../../generated/prisma/enums";

export interface IuserStatusUpdate {
  status: UserStatus;
}