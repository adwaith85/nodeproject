import express,{Router} from "express"
import { addcategory, category } from "../controller/category.js"


const router=express.Router()

router.get('/category',category)
router.post('/category',addcategory)

export default router