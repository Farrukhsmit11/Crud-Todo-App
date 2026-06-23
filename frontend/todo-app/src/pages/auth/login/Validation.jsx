import * as Yup from "yup"

export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email"),
    password: Yup.string()
        .min(8, "Password must be atleast 8 characters")
        .matches(/[A-Z]/, 'Password must contain atleast one uppercase letter ')
        .matches(/[a-z]/, "Password must contain atleast one lowercase letter")
        .matches(/[0-9]/, 'Password must contain atleast one number ')
        .matches(/[@#$%&]/, 'Password must contain atleast one special character')
})