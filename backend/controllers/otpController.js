import { Otp } from "../models/Otp.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

export const getOtp = async (request, response) => {
    try {
        const data = await Otp.find()
        response.status(200).json({ message: "OTP data fetched", data })
    } catch (error) {
        console.error("Error fetching otp data", error)
        response.status(500).json({ message: "Internal server error" })
        return
    }
}

export const verifyOtp = async (request, response) => {

    const { otp, email } = request.body

    try {
        if (!email || !otp) {
            response.status(404).send({ message: "Email and OTP are required" })
            return
        }

        const data = await Otp.findOne({ email })

        if (!data) {
            response.status(400).send({ message: "OTP not found" })
            return
        }

        const isMatch = await bcrypt.compare(otp.toString(), data.otp);

        if (!isMatch) {
            response.status(400).send({ message: "Invalid OTP" })
            return
        }

        const otpToken = jwt.sign({
            email: data.email
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )

        response.cookie("otpToken", otpToken, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true
        })

        await Otp.deleteMany({ email })

        response.status(200).json({ message: "OTP Verified", data: data, success: true })
    } catch (error) {
        console.error("Error Otp verification", error)
    }
}

export default { verifyOtp }