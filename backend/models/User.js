import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    resetPasswordToken: {
        type: String,
        default: null
    },

    resetTokenExpiry: {
        type: Date,
        default: 0
    }
},
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema)