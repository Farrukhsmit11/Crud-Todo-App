import * as Yup from "yup"

export const signUpSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(10, "Password must be atleast 8 characters").required("Password is required")
})