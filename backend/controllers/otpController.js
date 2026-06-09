    import { Otp } from "../models/Otp.js"

    export const verifyOtp = async (request, response) => {

        const { otp, email } = request.body

        try {
            const otpDoc = await Otp.findOne({
                email: request.body.email
            })

            if (!otpDoc) {
                response.status(400).send({ message: "Invalid Otp" })
                return
            }

            response.status(200).send({ message: "OTP Valid", data: otpDoc })
        } catch (error) {
            console.error("Error verifying OTP", error)
        }
    }

    export default { verifyOtp }