import { Router } from "express";
import {auth} from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post(
  "/create",
  auth("CUSTOMER"),
  paymentController.createPayment,
);
router.post("/confirm", paymentController.confirmPayment);
router.get(
  "/",
  auth(Role.CUSTOMER, Role.ADMIN),
  paymentController.getMyPayments,
);
router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.getPaymentById,
);

export const paymentRoutes = router;