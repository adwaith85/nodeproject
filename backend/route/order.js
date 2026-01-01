import express from "express";
import { CreateOrder, ordered, getUserOrderCount } from "../controller/order.js";
import { LoginCheck } from "../middleware/Auth.js";


const order = express.Router();

order.get("/order", ordered)
order.post("/order", LoginCheck, CreateOrder)
order.get("/order/count", LoginCheck, getUserOrderCount)

export default order;