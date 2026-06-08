import { Form as AntForm, Button, Input } from "antd"
import { Formik } from "formik"
import "./OtpVerification.css"
import { otpSchema } from "./OtpSchema"
import { useState } from "react"
import OTP from "antd/es/input/OTP"
import { createStaticStyles } from 'antd-style';


const OtpVerification = () => {

    const [form] = AntForm.useForm()
    const [verify, setVerify] = useState("")

    const initialValues = {
        otpInput: ""
    }

    const handleFormSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm()
    }

    const styles = createStaticStyles(({ css, cssVar }) => ({
        root: css`
    border-width: ${cssVar.lineWidth};
    border-radius: ${cssVar.borderRadius};
    transition: box-shadow ${cssVar.motionDurationMid};
    &:hover {
      border: 1px solid #d9d9d9;
    }
    &:focus-visible {
      border-color: lab(66.128% 0 0);
      box-shadow: 0 0 0 4px color-mix(in oklab, lab(66.128% 0 0) 50%, transparent);
    }
  `,
    }));

    const stylesFnOTP = info => {
        if (info.props.size === 'medium') {
            return {
                input: {
                    borderColor: '#6E8CFB',
                    width: 32,
                },
            };
        }

    }

    const classNames = styles;


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
                                <OTP classNames={classNames} styles={stylesFnOTP} size="medium" length={6} separator="*" />

                            </AntForm.Item>

                            <div className="verification-footer">
                                <Button
                                    htmlType="submit"
                                    className="submit-btn"
                                >Resend OTP
                                </Button>
                            </div>

                            <div className="countdown-timer">
                                <span>The Resend OTP will expire in 10 minutes  </span>
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