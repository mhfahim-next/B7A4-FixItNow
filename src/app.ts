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
import { paymentRoutes } from "./modules/payment/payment.route";


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



app.get("/payment-success", (req: Request, res: Response) => {
  const { session_id } = req.query;
  res.send(`
    <h2>Payment completed</h2>
    <p>Copy this session ID into <code>POST /api/payments/confirm</code>:</p>
    <pre>${session_id}</pre>
  `);
});

app.get("/payment-cancel", (req: Request, res: Response) => {
  res.send("<h2>Payment was cancelled.</h2>");
});

app.use("/api/auth", authRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/technicians", technicianRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/review" , reviewRoute);

app.use("/api/admin", adminRoute);

app.use("/api/payment", paymentRoutes);


export default app;