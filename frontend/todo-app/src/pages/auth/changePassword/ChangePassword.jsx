import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form as AntForm, Button, Input, message } from "antd"
import "./ChangePassword.css"
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const [form] = AntForm.useForm()
    const [newPassword, setNewPassword] = useState("")

    const BASE_URL = "http://localhost:3000"
    const location = useLocation()

    const changeEmail = location.state?.email

    const navigate = useNavigate()

    const handLeChangePassword = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/change-password`, {
                email: changeEmail,
                newPassword
            })
            const data = res.data?.user
            message.success("Password reset sucessfully")
            navigate("/login")
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message)
            }
            console.error("error", error)
        }
    }

    return (
        <div className='auth-container'>
            <div className="auth-card">
                <h1 className='auth-title'>Create New Password</h1>

                <Formik
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
                                    onChange={(e) => setNewPassword(e.target.value)}
                                >
                                </Input.Password>
                            </AntForm.Item>

                            <AntForm.Item label="Confirm Password">
                                <Input.Password className='form-input' placeholder='Confirm Password' ></Input.Password>
                            </AntForm.Item>

                            <div className='form-footer-section'>
                                <Button
                                    htmlType='submit'
                                    onClick={() => handLeChangePassword()}
                                    type='primary'
                                    className='submit-btn'
                                >Update Password</Button>
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