import * as Yup from "yup";

export const otpSchema = Yup.object({
    otpInput: Yup.string().max(/^\d{6}$/, "OTP must be atleast 6 characters").required("OTP is required")
})