import { Router } from "express";
import { serviceController } from "./services.controller";
import {auth} from "../../middlewares/auth";

const router = Router();

router.post("/", auth("TECHNICIAN"), serviceController.createService);
router.get("/", serviceController.getAllServices)


export default router;