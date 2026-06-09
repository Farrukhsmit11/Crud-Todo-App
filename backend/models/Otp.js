import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

    userId: {
        type: String
    },

    otp: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
},
    { timestamps: true },
)


export const Otp = new mongoose.model("Otp", otpSchema)