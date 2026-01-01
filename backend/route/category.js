import express from "express"
import { addcategory, category, deletecategory, updatecategory } from "../controller/category.js"


const router = express.Router()

router.get('/category', category)
router.post('/category', addcategory)
router.delete('/category/:id', deletecategory)
router.put('/category/:id', updatecategory)

export default router