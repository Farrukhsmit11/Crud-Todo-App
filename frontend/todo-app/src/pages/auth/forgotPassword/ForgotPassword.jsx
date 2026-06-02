import { Formik } from 'formik'
import React from 'react'
import { forgotPasswordSchema } from './ForgotPasswordSchema'
import { Form as AntForm, Button, Checkbox, Input } from "antd"
import "./ForgotPassword.css"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    const [form] = AntForm.useForm();

    const initialValues = {
        email: ""
    }


    const onSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm();
    }


    const navigate = useNavigate();

    return (
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
                                validateStatus={errors.email && touched.email ? "error" : ""}
                                help={
                                    errors.email && touched.email ? (
                                        <span className='form-error'>{errors.email}</span>
                                    ) : null
                                }
                            >
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className='form-input'
                                    placeholder='Enter Email'
                                    name='email'
                                ></Input>
                            </AntForm.Item>

                            <div className="forgot-password-card-footer">
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='resend-email-btn'
                                >Resend Email</Button>

                                <Button
                                    onClick={() => navigate("/login")}
                                    type='primary'
                                    className='resend-email-btn'
                                >Login</Button>
                            </div>
                        </AntForm>
                    )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ForgotPassword