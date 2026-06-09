import express, { request, response, text } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../services/emailService.js"
import otpTemplate from "../templates/otpTemplate.js"
import generateOtp from "../utils/generateOtp.js"
import signupTemplate from "../templates/signupTemplate.js"
import { Otp } from "../models/Otp.js"

export const registerUser = async (request, response) => {

    const { email: userEmail, name } = request.body

    try {
        const email = await User.findOne({ email: request.body.email })
        if (email) {
            response.status(400).send({ message: "Sorry a user with this email already exist" })
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



        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userEmail,
            subject: "Welcome to Todo List",
            text: `Hello ${name}. Welcome To Todo-List Website. Your account has been created sucessfully 🎉 with the ${userEmail}`,
            html: signupTemplate(userEmail)
        }

        await transporter.sendMail(mailOptions);

        response.status(200).json({ message: "signup sucessfully", data: data, sucess: true })

    } catch (error) {
        console.error("Error creating user", error)
    }
}

export const loginUser = async (request, response) => {

    const { email: userEmail } = request.body

    try {
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

        const token = jwt.sign(
            {
                id: result._id,
                email: result.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1hr"
            }
        );

        response.cookie("token", token, {
            expires:
                new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
            sameSite: "lax"
        })

        const otp = generateOtp()

        await Otp.create({ userEmail, otp })

        const sendEmail = {
            from: process.env.SENDER_EMAIL,
            to: userEmail,
            id: result._id,
            email: result.email,
            subject: "Verify your email",
            html: otpTemplate(otp),
            text: `Your OTP is ${generatedOtp}. It will expire in 5 minutes.`
        }

        await transporter.sendMail(sendEmail)

        response.status(200).json({ message: "Credentials valid. OTP sent", data: result })
    } catch (error) {
        return response.json({ sucess: false, message: error.message })
        console.error("Login failed", error)
    }
}

export default { registerUser, loginUser }