import express, { response } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
            response.status(400).send({ message: "Sorry a user with this email already exist " })
            return
        }

        if (!request.body.name || !request.body.email || !request.body.password) {
            response.status(400).send({ message: "Please Fill all The Fields" })
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
        console.error("Error creating user", error)
    }
}

export const loginUser = async (request, response) => {

    if (!request.body.email || !request.body.password) {
        response.status(400).send({ message: "Please Fill all the fields" })
        return
    }

    const result = await User.findOne({ email: request.body.email })

    if (!result) {
        response.status(400).send({ message: "user not found" })
    }

    const isPasswordValid = await bcrypt.compare(request.body.password, result.password)
    if (!isPasswordValid) {
        response.status(400).send({ message: "Incorrect Password" })
    }

    // Way to Create Token
    const token = jwt.sign({
        id: result._id,
        email: result.email,
        expiresIn: "1h"
    },
        process.env.JWT_SECRET_KEY)

    response.status(200).json({ message: "login sucessfully", data: result, token })
}


export default { registerUser, getUsers, loginUser }