import { Router } from "express";

import {auth} from "../../middlewares/auth";
import { categoryController } from "./categories.controller";


const router = Router();

router.post("/",auth("ADMIN"), categoryController.addCategory);
router.get("/", categoryController.getAllCategories);




export default router;