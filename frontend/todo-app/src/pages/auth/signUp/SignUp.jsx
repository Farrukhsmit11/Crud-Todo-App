import { Formik } from 'formik'
import React from 'react'
import { Form as AntForm, Button, Checkbox, Input } from "antd"
import { signUpSchema } from "./SignUpSchema"
import "./SignUp.css"
import { useNavigate } from "react-router-dom"

const SignUp = () => {

    const [form] = AntForm.useForm()

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
                        handleChange,
                        values,
                        errors,
                        touched
                    }) => (
                        <AntForm
                            layout='vertical'
                            form={form}
                            onFinish={handleSubmit}
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className='form-input'
                                    placeholder='Enter Password'
                                    name='password'
                                ></Input>
                            </AntForm.Item>

                            <div className="signup-card-footer">
                                <Button
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