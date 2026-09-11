import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";

const route = Router();

route.post("/",auth("CUSTOMER"), ReviewController.createReview);
route.get("/my-reviews", auth("CUSTOMER"), ReviewController.getMyReviews);
route.get("/service/:serviceId", auth("CUSTOMER"), ReviewController.getReviewsByService);

export const reviewRoute = route;