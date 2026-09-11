import express,{ Application,Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";

import {authRoutes} from "./modules/auth/auth.route";
import {serviceRoutes} from "./modules/services/services.route";
import {technicianRoutes} from "./modules/technician/technician.route";
import {categoryRoutes} from "./modules/categories/categories.route";
import {bookingRoutes} from "./modules/bookings/bookings.route";
import { reviewRoute } from "./modules/review/review.route";
import { adminRoute } from "./modules/admin/admin.route";


const app : Application = express();
app.use(cors({
    origin : config.app_url,
    credentials : true,
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


app.get("/",(req: Request, res: Response)=>{
    res.send("Hello, World!")
})

app.use("/api/auth", authRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/technicians", technicianRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/review" , reviewRoute);

app.use("/api/admin", adminRoute);

export default app;