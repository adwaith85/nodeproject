import express, { Router } from "express"
import { cateItem } from "../controller/cateItems.js"



const router = express.Router()

router.get('/cateItem/:name', cateItem)


export default router