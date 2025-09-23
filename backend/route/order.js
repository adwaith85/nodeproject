import express from "express";
import { CreateOrder } from "../controller/order.js";
import { LoginCheck } from "../middleware/Auth.js";

const order=express.Router();

order.post("/order",LoginCheck,CreateOrder)

export default order;