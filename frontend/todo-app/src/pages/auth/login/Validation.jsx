import * as Yup from "yup"

export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(10, "Password must be atleast 10 characters").required("Password is required")
})