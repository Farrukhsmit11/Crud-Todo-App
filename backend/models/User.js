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
        type: String
    },

    resetTokenExpiry: {
        type: Date
    }
},
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema)