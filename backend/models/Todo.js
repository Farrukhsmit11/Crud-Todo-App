import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: { type: String, required: true }
},
    { timestamps: true }
)

export const Todo = mongoose.model("Todo", todoSchema)