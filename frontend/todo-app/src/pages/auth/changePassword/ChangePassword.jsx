import { Formik } from 'formik'
import React from 'react'
import { Form as AntForm, Button, Input } from "antd"
import "./ChangePassword.css"

const ChangePassword = () => {

    const [form] = AntForm.useForm()

    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    }

    return (
        <div className='auth-container'>
            <div className="auth-card">
                <h1 className='auth-title'>Create   New Password</h1>

                <Formik
                    initialValues={initialValues}
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
                            layout='vertical'
                        >
                            <AntForm.Item label="New Password">
                                <Input.Password
                                    placeholder='New Password'
                                    className='form-input'
                                >
                                </Input.Password>
                            </AntForm.Item>

                            <AntForm.Item label="Confirm Password">
                                <Input.Password className='form-input' placeholder='Confirm Password' ></Input.Password>
                            </AntForm.Item>

                            <div className='form-footer-section'>
                                <Button type='primary' className='submit-btn'>Update Password</Button>
                            </div>
                        </AntForm>
                    )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ChangePassword