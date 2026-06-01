import React from 'react'
import { Formik } from "formik"
import { validationSchema } from './Validation'
import { Form as AntForm, Button, Checkbox, Input } from "antd"
import "./Login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [form] = AntForm.useForm();

  const initialValues = {
    email: "",
    password: ""
  }

  const onSubmit = (values, { resetForm }) => {
    console.log(values)
    resetForm();
  }

  const navigate = useNavigate();

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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className='form-input'
                    placeholder='Enter Email'
                    name='email'
                  ></Input>
                </AntForm.Item>

                <AntForm.Item
                  label={<span className='form-label'>Password</span>}
                >
                  <Input.Password
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
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