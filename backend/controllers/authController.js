import express, { response } from "express"
import { User } from "../models/User.js"

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
        const obj = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }
        const data = await User.create(obj)
        response.status(200).json({ data: data })
    } catch (error) {
        console.error("error", error)
    }
}

export default { registerUser, getUsers }