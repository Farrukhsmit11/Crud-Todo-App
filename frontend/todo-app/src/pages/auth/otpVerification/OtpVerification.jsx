import { Form as AntForm, Button, Input, message } from "antd"
import { Formik } from "formik"
import "./OtpVerification.css"
import { otpSchema } from "./OtpSchema"
import { useState } from "react"
import OTP from "antd/es/input/OTP"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const OtpVerification = () => {

    const [form] = AntForm.useForm();
    const [otp, setOtp] = useState("");
    const [email , setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues = {
        otpInput: ""
    }

    const handleFormSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm()
    }

    const BASE_URL = "http://localhost:3000"

    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/verify-otp`, {
                email,
                otp
            })
            const isVerified = response?.data?.data
            message.success("OTP Verified")
            navigate("/todoList")
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message)
            }
            console.error("Error verifiying otp", error)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="otp-form-header">
                    <h1 className="otp-form-title">Verify Your Account</h1>
                    <p>We've sent a 6-digit code to email</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={otpSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({
                        handleBlur,
                        handleChange,
                        handleReset,
                        handleSubmit,
                        values,
                        errors,
                        touched
                    }) => (
                        <AntForm
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <AntForm.Item
                                validateStatus={errors.otpInput && touched.otpInput ? "error" : ""}
                                help={
                                    errors.otpInput && touched.otpInput ? (
                                        <span>{errors.otpInput}</span>
                                    ) : null
                                }
                            >
                                <Input.OTP
                                    classNames="otp-input"
                                    size="medium"
                                    length={6}
                                    separator="-"
                                    onChange={(e) => setOtp(e.target.value)}
                                    value={otp}
                                    name="otpInput"
                                />

                            </AntForm.Item>

                            <div className="verification-footer">
                                <Button
                                    htmlType="submit"
                                    className="submit-btn"
                                    onClick={() => handleVerifyOtp()}
                                >Resend OTP
                                </Button>
                            </div>

                            <div className="countdown-timer">
                                <span className="form-description">The Resend OTP will expire in 10 minutes  </span>
                            </div>
                        </AntForm>
                    )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default OtpVerification