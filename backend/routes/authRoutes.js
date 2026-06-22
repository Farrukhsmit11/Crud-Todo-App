import express from "express"
const router = express.Router()
import { registerUser, loginUser, forgotPassword, resetOtp, changePassword } from "../controllers/authController.js"
import { getOtp, resendOtp, verifyOtp } from "../controllers/otpController.js"

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify-otp").post(verifyOtp)
router.route("/get-otp").get(getOtp)
router.route("/resend-otp").post(resendOtp)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-reset-otp").post(resetOtp)
router.route("/change-password").post(changePassword)

export default router