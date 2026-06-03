import express from "express"
const router = express.Router()
import { registerUser, getUsers } from "../controllers/authController.js"

router.route("/users",).get(getUsers)
router.route("/signup").post(registerUser)

export default router