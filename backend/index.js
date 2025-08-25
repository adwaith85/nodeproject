import dotenv from "dotenv"

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Item from "./model.js"

dotenv.config()
const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT


const app=express()
mongoose.connect(MONGO_URL)
app.use(express.json())
app.use(cors())

const items=[]

app.get("/products",async(req,res)=>{
    console.log("get request")

    const items=await Item.find({}) 

    res.json(items)

})

app.post("/products",(req,res)=>{
    const {name,image,price}=req.body
    


    console.log(name,image,price)

    Item.create({name,image,price})

    res.send("ok created")

})

app.delete("/products/:id",async(req,res)=>{
    try{   
    const {id}=req.params
    console.log(id)

    await Item.findByIdAndDelete(id) 
    
     }catch(err){
        console.log(err)
    }
 
    res.send("deleted")

})

app.listen(PORT,()=>console.log(`running on ${PORT}`))