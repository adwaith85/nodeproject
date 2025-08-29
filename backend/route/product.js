import express, { Router } from "express"
import { deleteitem, item, itemadd } from "../controller/product.js"

const router=express.Router()


router.get('/products',item)
router.post("/products",itemadd)
router.delete("/products/:id",deleteitem)


export default router