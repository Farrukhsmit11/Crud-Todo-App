import * as Yup from "yup"

export const resetPasswordSchema = Yup.object({
    password: Yup.string().min(8).matches("uppercaseRegex")
        .matches("lowercaseRegex")
        .matches("numberRegex").required("password is required")
})