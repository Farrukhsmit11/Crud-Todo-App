import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form as AntForm, Button, Checkbox, Input, message } from "antd"
import { signUpSchema } from "./SignUpSchema"
import "./SignUp.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {

    const [form] = AntForm.useForm()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const BASE_URL = "http://localhost:3000"

    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const navigate = useNavigate();

    const onSubmit = (values, { resetForm }) => {
        console.log("values", values)
        resetForm();
    }

    const handleSignup = async () => {
        try {
            const addUser = await axios.post(`${BASE_URL}/signup`, {
                name,
                email,
                password
            })
            const createdUser = addUser.data?.data
            console.log("user created", createdUser)
            message.success("Signup Sucessfull")
            setEmail("")
            navigate("/login")
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message)
                console.log(error.response)
            }
            console.error("Error adding user", error)
        }
    }

    return (
        <div className='auth-container'>
            <div className="auth-card">
                <h1 className='auth-title'>Sign Up</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={signUpSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        handleSubmit,
                        handleBlur,
                        values,
                        errors,
                        touched
                    }) => (
                        <AntForm
                            layout='vertical'
                            form={form}
                            onFinish={handleSubmit}
                            method='POST'
                            action="/signup"
                        >
                            <AntForm.Item
                                label={<span className='form-label'>Name</span>}
                                validateStatus={errors.name && touched.name ? "error" : ""}
                                help={
                                    errors.name && touched.name ? (
                                        <span className='form-error'>{errors.name}</span>
                                    ) : null
                                }
                            >
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={handleBlur}
                                    value={name}
                                    className='form-input'
                                    placeholder='Enter Name'
                                    name='name'
                                ></Input>
                            </AntForm.Item>

                            <AntForm.Item
                                validateStatus={errors.email && touched.email ? "error" : ""}
                                help={
                                    errors.name && touched.name ? (
                                        <span className='form-error'>{errors.email}</span>
                                    ) : null
                                }
                                label={<span className='form-label'>Email</span>}
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

                            <AntForm.Item
                                validateStatus={errors.password && touched.password ? "error" : ""}
                                help={
                                    errors.password && touched.password ? (
                                        <span className='form-error'>{errors.password}</span>
                                    ) : null
                                }
                                label={<span className='form-label'>Password</span>}
                            >
                                <Input
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={handleBlur}
                                    value={password}
                                    className='form-input'
                                    placeholder='Enter Password'
                                    name='password'
                                ></Input>
                            </AntForm.Item>

                            <div className="signup-card-footer">
                                <Button
                                    onClick={() => handleSignup()}
                                    type='primary'
                                    htmlType='submit'
                                    className='submit-btn'
                                >Sign Up</Button>

                                <Button
                                    onClick={() => navigate("/login")}
                                    type='primary'
                                    className='submit-btn'

                                >Log in</Button>
                            </div>
                        </AntForm>
                    )
                    }
                </Formik>
            </div>

        </div>
    )
}

export default SignUp