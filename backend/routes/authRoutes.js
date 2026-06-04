import express from "express"
const router = express.Router()
import { registerUser, getUsers, loginUser } from "../controllers/authController.js"

router.route("/users",).get(getUsers)
router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)

export default router