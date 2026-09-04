import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

router.post("/", technicianController.createTechnicianProfile);



export default router;