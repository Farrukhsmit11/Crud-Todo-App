import React from 'react'
import { Formik } from "formik"
import { validationSchema } from './Validation'
import { Form as AntForm, Button, Checkbox, Input, message } from "antd"
import "./Login.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from 'react'

const Login = () => {

  const [form] = AntForm.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "http://localhost:3000"

  const initialValues = {
    email: "",
    password: ""
  }

  const onSubmit = (values, { resetForm }) => {
    console.log("values", values)
    resetForm();
  }

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const isLogin = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      })
      message.success("Login Sucessfull")
      navigate("/todoList")
      setEmail("")
      const loginUser = isLogin?.data?.result
      console.log("login user", loginUser)
    } catch (error) {
      console.error("error login", error)
    }
  }


  return (
    <div className='auth-container'>
      <div className="auth-card">
        <div className="auth-header">
          <h1 className='auth-title'>Login</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched
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
                  <Input.Password
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    value={password}
                    className='form-input'
                    placeholder='Enter password'
                    name='password'
                  ></Input.Password>
                </AntForm.Item>


                <div className="form-footer">
                  <Checkbox>Remember me</Checkbox>
                  <a
                    onClick={() => navigate("/forgotPassword")}
                    href='#'
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="btn-main">
                  <Button
                    onClick={() => handleLogin()}
                    type='primary'
                    className='submit-btn'
                    htmlType='submit'
                  >Log In</Button>
                </div>


                <div className="auth-card-footer">
                  <span>Don,t have an account?

                    <a
                      href='#'
                      onClick={() => navigate("/")}
                    >Sign Up</a>
                  </span>
                </div>
              </AntForm>
            )
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login