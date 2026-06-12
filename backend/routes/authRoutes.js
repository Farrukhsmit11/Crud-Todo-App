import express from "express"
const router = express.Router()
import { registerUser, loginUser } from "../controllers/authController.js"
import { getOtp, resendOtp, verifyOtp } from "../controllers/otpController.js"

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify-otp").post(verifyOtp)
router.route("/get-otp").get(getOtp)
router.route("/resend-otp").post(resendOtp)

export default router