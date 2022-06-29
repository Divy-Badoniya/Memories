import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../Models/userModel.js"
import dotenv from "dotenv"

dotenv.config()

export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(404).json("User doesn't exist")
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json("Invalid Credentials")
        }
        const token = jwt.sign({ email: email, id: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: "1hr" })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.statue(400).json("User already exist")
        }
        if (password !== confirmPassword) {
            return res.status(400).json("Password Not Same")
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await userModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.TOKEN_KEY, { expiresIn: "1hr" })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json(error)
    }
}