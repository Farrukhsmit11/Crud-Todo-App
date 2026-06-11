import { Form as AntForm, Button, Input, message } from "antd"
import { Formik } from "formik"
import "./OtpVerification.css"
import { otpSchema } from "./OtpSchema"
import { useEffect, useState } from "react"
import OTP from "antd/es/input/OTP"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

const OtpVerification = () => {

    const [form] = AntForm.useForm();
    const [otp, setOtp] = useState("");
    const [fieldValue, setFieldValue] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
 
    const userEmail = location.state?.email

    const initialValues = {
        email,
        otp: ""
    }

    const navigate = useNavigate();

    const handleFormSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm()
    }

    const BASE_URL = "http://localhost:3000"

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/verify-otp`, {
                otp,
                email: userEmail
            },
                { withCredentials: true }
            )
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
                    <h1 className="otp-form-title">Verify OTP</h1>
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
                                validateStatus={errors.otp && touched.otp ? "error" : ""}
                                help={
                                    errors.otp && touched.otp ? (
                                        <span>{errors.otp}</span>
                                    ) : null
                                }
                            >
                                <Input.OTP
                                    classNames="otp-input"
                                    size="medium"
                                    length={6}
                                    separator="-"
                                    onChange={(value) => setOtp(value)}
                                    value={values.otp}
                                    name="otp"
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