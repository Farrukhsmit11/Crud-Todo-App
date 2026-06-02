import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    title: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: Number }
})

export const User = mongoose.model("User", userSchema)