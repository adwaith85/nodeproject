import express from "express";
import { CreateOrder, ordered } from "../controller/order.js";
import { LoginCheck } from "../middleware/Auth.js";


const order=express.Router();

order.get("/order",ordered)
order.post("/order",LoginCheck,CreateOrder)

export default order;