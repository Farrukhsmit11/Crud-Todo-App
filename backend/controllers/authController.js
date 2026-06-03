import express, { response } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"

export const getUsers = async (request, response) => {
    try {
        const data = await User.find()
        response.status(200).json({ data })
    } catch (error) {
        console.error("error fetching users")
    }
}

export const registerUser = async (request, response) => {
    try {
        const email = await User.findOne({ email: request.body.email })
        if (email) {
            response.status(400).send({ message: "Email already exist" })
            return
        }

        const encryptedPassword = await bcrypt.hash(request.body.password, 10)

        const data = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: encryptedPassword
        })
        response.status(200).json({ message: "signup sucessfully", data: data })
    } catch (error) {
        console.error("error", error)
    }
}

export default { registerUser, getUsers }