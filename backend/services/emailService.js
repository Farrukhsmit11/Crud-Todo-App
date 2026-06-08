import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})
export default transporter