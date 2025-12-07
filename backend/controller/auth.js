import Usermodel from "../model/userModel.js"

import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password, name, number } = req.body

    try {
        const existingUser = await Usermodel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        await Usermodel.create({ email, password, name, number })
        res.status(201).json({ message: "Registration successful" })
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
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