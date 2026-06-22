import Joi from "joi"

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%]).{8,}$/)
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

