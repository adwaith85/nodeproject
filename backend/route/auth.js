import express from "express"

// change made in test branch

import { getUser, login, register, updateUser } from "../controller/auth.js"
import { LoginCheck } from "../middleware/Auth.js"
import { upload } from "../middleware/upload.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/getUser", LoginCheck, getUser)
router.put("/updateUser", LoginCheck, upload.single('profileImage'), updateUser)


export default router