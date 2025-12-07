import Usermodel from "../model/userModel.js"

import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password } = req.body

    await Usermodel.create({ email, password })


    res.send("created ok")



}

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await Usermodel.findOne({ email: email })

    if (user) {
        const isMatch = await user.comparePassword(password)

        if (isMatch) {
            const token = jwt.sign({ email: user.email, role: user.role }, 'qwerty', { expiresIn: '24h' });

            res.json({
                status: "login done",
                token: token
            })
        } else {
            res.status(401).json({ error: "Wrong password" })
        }
    } else {
        res.status(404).json({ error: "No user found" })
    }


}