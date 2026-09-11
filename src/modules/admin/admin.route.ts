import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";



const route = Router();

route.get("/users", auth("ADMIN"), AdminController.getAllUsers);
route.patch("/users/:id", auth("ADMIN"), AdminController.updateUserStatus);
route.get("/bookings", auth("ADMIN"), AdminController.getAllBookings);
route.get("/bookings/:id", auth("ADMIN"), AdminController.getSingleBooking);
route.patch("/bookings/:id", auth("ADMIN"), AdminController.updateBookingStatus);
route.get("/categories", auth("ADMIN"), AdminController.getAllCategories);
route.post("/categories", auth("ADMIN"), AdminController.createCategory);
route.get("/categories/:id", auth("ADMIN"), AdminController.getSingleCategory);
route.patch("/categories/:id", auth("ADMIN"), AdminController.updateCategory);
route.delete("/categories/:id", auth("ADMIN"), AdminController.deleteCategory);



export const adminRoute = route;