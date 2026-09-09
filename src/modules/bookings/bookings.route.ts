import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { bookingController } from "./bookings.controller";


const router = Router();

router.post("/",auth("CUSTOMER"), bookingController.addBooking); 
router.get("/",auth("CUSTOMER"), bookingController.getUsersBookings);
router.get("/:id",auth("CUSTOMER"), bookingController.getSingleBooking);

export default router;