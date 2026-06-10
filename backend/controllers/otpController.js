import { Otp } from "../models/Otp.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const verifyOtp = async (request, response) => {
    try {
        const { otp } = request.body

        if (!otp) {
            response.status(400).send({ message: "Please provide with otp" })
            return
        }

        const data = await Otp.findOne({ email })

        if (!data) {
            response.status(400).send({ message: "OTP not found" })
            return
        }

        const isMatch = await bcrypt.compare(otp, data.otp)
        if (!isMatch) {
            response.status(400).send({ message: "Invalid OTP" })
            return
        }


        const otpToken = jwt.sign({
            email
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10m" }
        )

        response.cookie("otpToken", otpToken, {
            expires:
                new Date(Date.now() + 86400000),
            secure: process.env.NODE_ENV === "production",
            httpOnly: true
        })

        response.status(200).json({ message: "OTP Verified", data: data })
    } catch (error) {
        console.error("Error Otp verification", error)
    }
}

export default { verifyOtp }