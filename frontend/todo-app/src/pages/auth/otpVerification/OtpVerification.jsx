import { Form as AntForm, Button, Input, message } from "antd"
import { Formik } from "formik"
import "./OtpVerification.css"
import { otpSchema } from "./OtpSchema"
import { useState } from "react"
import OTP from "antd/es/input/OTP"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

const OtpVerification = () => {

    const [form] = AntForm.useForm();
    const [otp, setOtp] = useState("");
    const [fieldValue, setFieldValue] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);
    const [Isdisabled, setIsDisabled] = useState(true)

    const location = useLocation();

    const userEmail = location.state?.email

    const initialValues = {
        otpInput: ""
    }

    const navigate = useNavigate();

    const handleFormSubmit = (values, { resetForm }) => {
        console.log("values", values)
        form.resetFields()
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

    const handleResendOtp = async () => {
        try {
            const resend = await axios.post(`${BASE_URL}/resend-otp`, {
                email: userEmail
            },
                { withCredentials: true }
            )
            const data = resend?.data?.user
            message.success(`New OTP Has been sent to ${userEmail}`)
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message)
            }
            console.error("Error Resending OTP")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            // When seconds reach 0 decrease minutes
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setSeconds(59)
                    setMinutes(-1)
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [seconds])

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
                                validateStatus={errors.otpInput && touched.otpInput ? "error" : ""}
                                help={
                                    errors.otpInput && touched.otpInput ? (
                                        <span className="form-error">{errors.otpInput}</span>
                                    ) : null
                                }
                            >
                                <Input.OTP
                                    classNames="otp-input"
                                    size="medium"
                                    length={6}
                                    separator="-"
                                    onChange={(value) => setOtp(value)}
                                    value={values.otpInput}
                                    name="otpInput"
                                />

                            </AntForm.Item>

                            <div className="verification-footer">

                                <Button
                                    onClick={() => handleVerifyOtp()}
                                    className="verify-otp-btn"
                                    htmlType="submit"
                                >Verify</Button>

                                <Button
                                    htmlType="submit"
                                    onClick={() => handleResendOtp()}
                                    className="submit-btn"
                                >Resend OTP
                                </Button>
                            </div>

                            <div className="countdown-timer">
                                <span className="form-description">The Resend OTP will expire in
                                    <div>
                                        {seconds}
                                    </div>
                                </span>
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