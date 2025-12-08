import dotenv from "dotenv"

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Product from "./model/productmodel.js"

import CategoryROute from "./route/category.js"
import ProductRoute from "./route/product.js"
import AuthROute from "./route/auth.js"
import cateItemROute from "./route/cateItem.js"

import OrderRouter from "./route/order.js"

dotenv.config()
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce"
const PORT = process.env.PORT || 8000


const app = express()
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

app.use(express.json())
app.use(cors())

const items = []

app.use(ProductRoute)

app.use(AuthROute)

app.use(CategoryROute)

app.use(cateItemROute)
app.use(OrderRouter)

// app.get("/products",item)

// app.post("/products",itemadd)

// app.delete("/products/:id",deleteitem)

app.listen(PORT, () => console.log(`running on ${PORT}`))