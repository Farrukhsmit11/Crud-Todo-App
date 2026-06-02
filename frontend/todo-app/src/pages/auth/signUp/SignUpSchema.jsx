import * as Yup from "yup"

export const signUpSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().max(10, "Password must be atleast 10 characters").required("Password is required")
})