import { Formik } from 'formik'
import React from 'react'
import { forgotPasswordSchema } from './ForgotPasswordSchema'
import { Form as AntForm, Button, Checkbox, Input, message } from "antd"
import "./ForgotPassword.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from 'react'

const ForgotPassword = () => {

    const [form] = AntForm.useForm();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const initialValues = {
        email: ""
    }

    const onSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm();
    }

    const BASE_URL = "http://localhost:3000"

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/forgot-password`, {
                email
            })
            const data = response?.data.data
            message.success(`A 6-digit verification code has been sent to ${email}.`)
            setLoading(true)
            navigate("/resetPassword/:token")
            form.resetFields();
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message)
            }
            console.error("error sending reset email", error)
        } finally {
            setLoading(false)
        }
    }

    const navigate = useNavigate();

    return (
        <>


            <div className='auth-container'>
                <div className="auth-card">
                    <h1 className='auth-title'>Forgot Password?</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={forgotPasswordSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            handleSubmit,
                            handleBlur,
                            handleChange,
                            values,
                            errors,
                            touched,
                        }) => (
                            <AntForm
                                form={form}
                                layout='vertical'
                                onFinish={handleSubmit}
                            >
                                <AntForm.Item
                                    label={<span className='form-label'> Email</span>}
                                >
                                    <Input
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={handleBlur}
                                        value={email}
                                        className='form-input'
                                        placeholder='Enter Email'
                                        name='email'
                                    ></Input>
                                </AntForm.Item>

                                <div className="forgot-password-card-footer">
                                    <Button
                                        loading={loading}
                                        onClick={() => handleForgotPassword()}
                                        type='primary'
                                        htmlType='submit'
                                        className='resend-email-btn'
                                    >Send Email</Button>

                                    <Button
                                        onClick={() => navigate("/login")}
                                        type='primary'
                                        className='resend-email-btn-black'
                                    >Login</Button>
                                </div>
                            </AntForm>
                        )
                        }
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword