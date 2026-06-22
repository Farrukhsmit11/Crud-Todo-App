import express, { request, response, text } from "express"
import bcrypt, { hash } from "bcrypt"
import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import transporter from "../services/emailService.js"
import otpTemplate from "../templates/otpTemplate.js"
import signupTemplate from "../templates/signupTemplate.js"
import forgotPasswordTemplate from "../templates/forgotPasswordTempalte.js"
import { Otp } from "../models/Otp.js"
import { generateOtp } from "../utils/helper.js"
import crypto from "crypto"
import { loginSchema, registerSchema } from "../validations/user.validations.js"

export const registerUser = async (request, response) => {

    try {

        const { error, value } = registerSchema.validate(request.body)

        const { name, email, password } = value

        const res = await User.findOne({ email })

        if (res) {
            response.status(400).send({ message: "Sorry a user with this email already exist" })
            return
        }

        if (!name || !email || !password) {
            response.status(400).send({ message: "Please Fill all The Fields" })
            return
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const data = await User.create({
            name: name,
            email: email,
            password: encryptedPassword
        })
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Todo List",
            text: `Hello ${name}. Welcome To Todo-List Website. Your account has been created sucessfully 🎉 with the ${email}`,
            html: signupTemplate(email)
        }

        await transporter.sendMail(mailOptions);

        response.status(200).json({ message: "signup sucessfully", data: res, sucess: true })

    } catch (error) {
        console.error("Error creating user", error)
    }
}

export const loginUser = async (request, response) => {

    const { error, value } = loginSchema.validate(request.body)
    if (error) {
        response.status(400).json(error.details[0].message)
    }

    try {
        const { email, password } = value

        if (!email || !password) {
            response.status(400).send({ message: "Please Fill all the fields" })
            return
        }

        const result = await User.findOne({ email }).select("+password")

        if (!result) {
            response.status(400).send({ message: "Email and Password Incorrect" })
            return
        }

        const IsPasswordValid = await bcrypt.compare(password, result.password)
        if (!IsPasswordValid) {
            response.status(400).send({ message: "invalid password" })
            return
        }

        const token = jwt.sign(
            {
                id: result._id,
                email: result.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        response.cookie("token", token, {
            expires:
                new Date(Date.now() + 86400000),
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax"
        })

        const otp = generateOtp()
        console.log(otp)

        const otpHash = await bcrypt.hashSync(otp.toString(), 10)

        const data = await Otp.create({
            id: result._id,
            otp: otpHash,
            email: result.email,
            expiresTime: new Date(Date.now() + 5 * 60 * 1000)
        })

        const sendEmail = {
            from: process.env.SENDER_EMAIL,
            to: result.email,
            id: result._id,
            email: result.email,
            subject: "Verify your email",
            html: otpTemplate(otp),
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        }

        await transporter.sendMail(sendEmail)

        response.status(200).json({ message: "Credentials valid. OTP sent", data: result })
    } catch (error) {
        return response.json({ sucess: false, message: error.message })
        console.error("Login failed", error)
    }
}


export const forgotPassword = async (request, response) => {

    const { email } = request.body

    try {
        if (!email) {
            response.status(400).send({ message: "Email is required" })
            return
        }

        const res = await User.findOne({ email })

        if (!res) {
            response.status(400).send({ message: "user not found" })
            return
        }

        const otp = generateOtp();

        const otpRecord = await bcrypt.hash(otp.toString(), 10)

        const mailData = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Here is Your 6 digit ${otp}`
        }

        const otpData = await Otp.create({
            id: res.id,
            otp: otpRecord,
            isUsed: false,
            email: email,
            expiresTime: new Date(Date.now() + 10 * 60 * 1000)
        })

        console.log(otp)

        await transporter.sendMail(mailData)

        response.status(200).json({ message: "Reset Password OTP Sent", res })

    } catch (error) {
        console.error("Error", error)
    }
}


export const resetOtp = async (request, response) => {

    const { email, otp } = request.body

    try {
        if (!otp || !email) {
            response.status(400).send({ message: "OTP and Email is required" })
            return
        }

        const otpData = await Otp.findOne({ email })

        if (!otpData) {
            response.status(400).send({ message: "Otp not found" })
            return
        }

        const matched = await bcrypt.compare(otp.toString(), otpData.otp)
        if (!matched) {
            response.status(400).send({ message: "invalid otp" })
            return
        }

        await Otp.deleteMany({ email })

        response.status(200).json({ message: "OTP Verified Sucessfully", otpData })
    } catch (error) {
        console.error("error", error)
    }
}

export default { registerUser, loginUser, forgotPassword, resetOtp }