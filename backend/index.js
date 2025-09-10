import dotenv from "dotenv"

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Item from "./model/model.js"

import CategoryROute from "./route/category.js"
import ProductRoute from "./route/product.js"
import AuthROute from "./route/auth.js"

dotenv.config()
const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT


const app=express()
mongoose.connect(MONGO_URL)
app.use(express.json())
app.use(cors())

const items=[]

app.use(ProductRoute)

app.use(AuthROute)

app.use(CategoryROute)

// app.get("/products",item)

// app.post("/products",itemadd)

// app.delete("/products/:id",deleteitem)

app.listen(PORT,()=>console.log(`running on ${PORT}`))