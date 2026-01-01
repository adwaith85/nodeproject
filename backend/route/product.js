import express from "express"
import { deleteitem, item, itemadd, updateitem } from "../controller/product.js"
import { LoginCheck } from "../middleware/Auth.js"

const router = express.Router()


router.get('/products', LoginCheck, item)
router.post("/products", LoginCheck, itemadd)
router.delete("/products/:id", LoginCheck, deleteitem)
router.put("/products/:id", LoginCheck, updateitem)


export default router