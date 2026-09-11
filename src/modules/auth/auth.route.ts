import { Router } from "express";
import { AuthController } from "./auth.controller";

import {auth} from "../../middlewares/auth";

const router = Router();

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.loginUser);

router.get("/me", auth("ADMIN", "CUSTOMER", "TECHNICIAN"), AuthController.getMe);

// router.post("/refresh-token", AuthController.refreshTokenController)


export const authRoutes = router;