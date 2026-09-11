import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

// router.post("/", technicianController.createTechnicianProfile);

router.get ("/", technicianController.allTechnician);
router.get("/bookings/" , auth("TECHNICIAN"), technicianController.getTechnicianBookings);
router.get("/bookings/:id" , auth("TECHNICIAN"), technicianController.getaTechnicianBooking);
router.patch("/bookings/:id" , auth("TECHNICIAN"), technicianController.updateBookingStatus);

router.get("/:id", technicianController.aTechnicianProfile);
router.put("/profile/", auth("TECHNICIAN"), technicianController.updateTechnicianProfile);
router.put("/availability/", auth("TECHNICIAN"), technicianController.updateAvailability);





export const technicianRoutes = router;