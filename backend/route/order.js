import express from "express";
import { CreateOrder, ordered, getUserOrderCount, getAllOrders } from "../controller/order.js";
import { LoginCheck } from "../middleware/Auth.js";


const order = express.Router();

order.get("/order", LoginCheck, ordered)
order.post("/order", LoginCheck, CreateOrder)
order.get("/order/count", LoginCheck, getUserOrderCount)
order.get("/admin/orders", LoginCheck, getAllOrders)

export default order;