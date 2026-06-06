import React from 'react'
import { Form as AntForm, Button, Input } from "antd"
import "./ResetPassword.css"
import { Formik } from 'formik';
import { resetPasswordSchema } from './ResetPasswordSchema';

const ResetPassword = () => {

  const [form] = AntForm.useForm();

  const handlSubmit = (values) => {
    console.log("values", values);
    form.resetFields();
  }

  const initialValues = {
    password: "",
    confirmPassword: ""
  }

  return (
    <div className='auth-container'>
      <div className="auth-card">
        <h1 className='auth-title'>Reset Password</h1>

        <Formik
          validationSchema={resetPasswordSchema}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange
          }) => (
            <AntForm
              form={form}
              layout='vertical'
              onFinish={handlSubmit}
            >
              <AntForm.Item
                label="Password"
              >
                <Input.Password
                  placeholder='Password'
                  type="password"
                  name='password'
                  className='form-input'
                ></Input.Password>
              </AntForm.Item>


              <AntForm.Item
                label={<span className='form-label'>Confirm Password</span>}
              >
                <Input.Password
                  placeholder=' Confirm Password'
                  type="password"
                  name='password'
                  className='form-input'
                ></Input.Password>
              </AntForm.Item>

              <div className='submit-actions'>
                <Button
                  className='reset-password-btn'
                  htmlType='submit'
                >Reset Password</Button>

              </div>

            </AntForm>
          )
          }
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword