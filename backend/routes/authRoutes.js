import express from "express"
const router = express.Router()
import { registerUser, loginUser } from "../controllers/authController.js"
import { getOtp, verifyOtp } from "../controllers/otpController.js"

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify-otp").post(verifyOtp)
router.route("/get-otp").get(getOtp)

export default router