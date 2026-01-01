import express from "express"
import { addcategory, category, deletecategory, updatecategory } from "../controller/category.js"
import { LoginCheck } from "../middleware/Auth.js"

const router = express.Router()

router.get('/category', LoginCheck, category)
router.post('/category', LoginCheck, addcategory)
router.delete('/category/:id', LoginCheck, deletecategory)
router.put('/category/:id', LoginCheck, updatecategory)

export default router