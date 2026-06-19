import React from 'react'
import { Form as AntForm, Button, Input, message } from "antd"
import "./ResetPassword.css"
import { Formik } from 'formik';
import { resetPasswordSchema } from './ResetPasswordSchema';
import axios from "axios"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

  const [form] = AntForm.useForm();

  const [otp, setOtp] = useState("")

  const handlSubmit = (values) => {
    console.log("values", values);
    form.resetFields();
  }

  const BASE_URL = "http://localhost:3000"

  const initialValues = {
    password: "",
    confirmPassword: ""
  }

  const navigate = useNavigate()

  return (
    <div className='auth-container'>
      <div className="auth-card">
        <div className="auth-header">
          <h1 className='reset-password-title'>Reset Password</h1>
          <p className='auth-description'>Enter 6-digit code sent to your email </p>
        </div>

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
                label="Verification Code"
              >
                <Input.OTP
                  separator="-"
                  type='otp'
                  value='otp'
                >
                </Input.OTP>
              </AntForm.Item>


              <div className='submit-actions'>
                <Button
                  className='reset-password-btn'
                  htmlType='submit'
                >Reset Password
                </Button>
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