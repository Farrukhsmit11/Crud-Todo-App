import * as Yup from "yup"

export const resetPasswordSchema = Yup.object({
    password: Yup.string().min(8).matches("uppercaseRegex")
        .required("password is required")
        .matches(/[A-Z]/, "Password must contain one uppercase letter")
        .matches(/[a-z]/, "Password must contain atleast one lowercase letter")
        .matches(/[@#$%&]/, "Password must contain one special character")
        .matches(/[0-9]/, "Password must contain atleast one digit")
})