import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { bookingController } from "./bookings.controller";


const router = Router();

router.post("/",auth("CUSTOMER"), bookingController.addBooking); ;


export default router;