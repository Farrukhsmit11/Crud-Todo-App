import express, { request, response, text } from "express"
import { User } from "../models/User.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../services/emailService.js"
import otpTemplate from "../templates/otpTemplate.js"
import signupTemplate from "../templates/signupTemplate.js"
import forgotPasswordTemplate from "../templates/forgotPasswordTempalte.js"
import { Otp } from "../models/Otp.js"
import { generateOtp } from "../utils/helper.js"
import crypto from "crypto"

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

    const { email: userEmail, password } = request.body

    try {
        if (!request.body.email || !request.body.password) {
            response.status(400).send({ message: "Please Fill all the fields" })
            return
        }

        const result = await User.findOne({ email: request.body.email }).select("+ password")

        if (!result) {
            response.status(400).send({ message: "Email and Password Incorrect" })
            return
        }

        
        console.log("Entered Password:", request.body.password);
        console.log("DB Hash:", result.password);

        const isPassowrdCorrect = await bcrypt.compare(password, result.password)
        if (!isPassowrdCorrect) {
            response.status(400).send({ message: "Invalid password" })
            return
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
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax"
        })

        const otp = generateOtp()

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

        const data = await User.findOne({ email })

        if (!data) {
            response.status(400).send({ message: "user not found" })
            return
        }

        const resetPasswordToken = jwt.sign({
            id: data.id,
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "20m" }
        )

        const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000

        const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${resetPasswordToken}`

        const emailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            id: data.email,
            email: data.email,
            subject: "Reset Password for Email Verification",
            html: forgotPasswordTemplate({ resetUrl })
        }

        await transporter.sendMail(emailOptions)
        data.resetPasswordToken = resetPasswordToken
        data.resetPasswordExpiry = resetTokenExpires
        await data.save();

        response.status(200).json({ message: "Reset Password Mail send Sucessfully" })

    } catch (error) {
        console.error("error", error)
    }
}


export const resetPassword = async (request, response) => {

    const { newPassword, confirmPassword } = request.body
    const { resetToken } = request.params;

    try {

        if (!newPassword || !confirmPassword) {
            response.status(400).send({ message: "Please Fill All Fields" })
            return
        }

        if (newPassword != confirmPassword) {
            response.status(400).send({ message: "Password does not match" })
            return
        }

        const user = await User.findOne({
            resetPasswordToken: resetToken,
        })

        if (!user) {
            response.status(400).send({
                message: "Invalid or expired token"
            });
            return
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        await user.save();

        response.status(200).send({ message: "Password reset sucessfully" })

    } catch (error) {
        console.error("error reseting password", error)
    }
}

export default { registerUser, loginUser, forgotPassword, resetPassword }