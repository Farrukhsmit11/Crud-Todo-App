import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

    otp: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    expiresTime: {
        type: Date,
        required: true
    },

    isUsed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true },
)


export const Otp = new mongoose.model("Otp", otpSchema)