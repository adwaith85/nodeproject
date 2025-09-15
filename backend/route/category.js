import express, { Router } from "express"
import { addcategory, category, deletecategory } from "../controller/category.js"


const router = express.Router()

router.get('/category', category)
router.post('/category', addcategory)
router.delete('/category/:id', deletecategory)

export default router