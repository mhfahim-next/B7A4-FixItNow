import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

// router.post("/", technicianController.createTechnicianProfile);

router.get ("/", technicianController.allTechnician);
router.get("/:id", technicianController.aTechnicianProfile);





export default router;