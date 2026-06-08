import express, { request, response, text } from "express"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../services/emailService.js"

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
            html: `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);">
      
      <div style="background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:30px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:24px;">Welcome Aboard 🚀</h1>
        <p style="margin:5px 0 0;font-size:14px;opacity:0.9;">Your account has been 
        created successfully</p>
      </div>

      <div style="padding:30px;color:#333;">
        <h2 style="margin-top:0;">Hi there 👋</h2>
        
        <p style="font-size:15px;line-height:1.6;">
          Thanks for signing up! We're excited to have you on board.
           Your account is now active and ready to use.
        </p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;padding:15px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;font-size:14px;">
            <strong>Email:</strong> ${userEmail}
          </p>
        </div>

        <p style="font-size:15px;line-height:1.6;">
          You can now log in and 
          start exploring all features.
        </p>

        <div style="text-align:center;margin:30px 0;">
         <a href="http://localhost:5173/login"
         style="background:#4f46e5;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-size:14px;    display:inline-block;"
        >
        Go to Login
        </a>
        </div>
    </div>
  </div>
  ` }

        await transporter.sendMail(mailOptions);

        response.status(200).json({ message: "signup sucessfully", data: data, sucess: true })

    } catch (error) {
        console.error("Error creating user", error)
    }
}

export const loginUser = async (request, response) => {
    try {
        if (!request.body.email || !request.body.password) {
            response.status(400).send({ message: "Please Fill all the fields" })
            return
        }

        const result = await User.findOne({ email: request.body.email })

        if (!result) {
            response.status(400).send({ message: "user not found" })
        }

        const isPasswordValid = await bcrypt.compare(request.body.password, result.password)
        if (!isPasswordValid) {
            response.status(400).send({ message: "Incorrect Password" })
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
            secure: true,
            httpOnly: true,
            sameSite: "lax"
        })

        response.status(200).json({ message: "login sucessfully", data: result })
    } catch (error) {
        return response.json({ sucess: false, message: error.message })
        console.error("Login failed", error)
    }
}

export default { registerUser, loginUser }