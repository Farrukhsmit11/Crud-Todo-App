import * as Yup from "yup"

export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email"),
    password: Yup.string().min(10, "Password must be atleast 10 characters")
})