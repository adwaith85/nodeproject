import express from "express"

// change made in test branch
import { login, register } from "../controller/auth.js"
const router = express.Router()

router.post("/login", login)
router.post("/register", register)




export default router